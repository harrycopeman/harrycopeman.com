(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Photo viewer');
  dialog.innerHTML = `<div class="lightbox-backdrop"></div><div class="lightbox-stage"></div>
    <div class="lightbox-top"><span class="lightbox-count" aria-live="polite"></span></div>
    <div class="lightbox-bottom"><p class="lightbox-title"></p><p class="lightbox-caption"></p></div>`;
  document.body.append(dialog);
  const stage = dialog.querySelector('.lightbox-stage');
  const backdrop = dialog.querySelector('.lightbox-backdrop');
  const chrome = [...dialog.querySelectorAll('.lightbox-top, .lightbox-bottom')];
  dialog.tabIndex = -1;
  const photos = [];
  const pointers = new Map();
  const panelCache = new Map();
  let motion = [], motionVersion = 0, queuedNavigation = 0;
  let index = 0, panels = [], busy = false, opener, oldOverflow, oldPadding;
  let dragX = 0, dragY = 0;
  let start, axis, moved = false, multi = false;
  const duration = n => reduced.matches ? 0 : n;
  const current = () => panels.find(panel => panel.offset === 0);

  function fitFrame(photo, frame) {
    // Original asset dimensions define the frame, never the viewport's shape.
    const width = Number(photo.data.width);
    const height = Number(photo.data.height);
    const ratio = width > 0 && height > 0 ? width / height
      : photo.intrinsicRatio || (photo.thumbnail.naturalWidth / photo.thumbnail.naturalHeight) || 1;
    const availableWidth = Math.max(1, stage.clientWidth - 40);
    const availableHeight = Math.max(1, stage.clientHeight - 32);
    const fittedWidth = Math.min(availableWidth, availableHeight * ratio);
    frame.style.aspectRatio = String(ratio);
    frame.style.width = `${fittedWidth}px`;
    frame.style.height = `${fittedWidth / ratio}px`;
  }

  function syncVideoPlayback() {
    for (const photo of photos) {
      if (photo.data.kind !== 'video') continue;
      const video = photo.thumbnail;
      const rect = photo.media.getBoundingClientRect();
      const shouldPlay = dialog.open ? photo === photos[index] : rect.bottom > 0 && rect.top < innerHeight;
      if (shouldPlay) {
        if (!video.src) video.src = photo.data.src;
        video.play().catch(() => {});
      } else video.pause();
    }
  }

  function restoreThumbnail(panel) {
    const photo = photos[panel.photoIndex];
    if (photo.thumbnail.parentElement === panel.frame) {
      const preview = photo.data.kind === 'video' ? new Image() : photo.thumbnail.cloneNode();
      if (photo.data.kind === 'video') { preview.src = photo.data.poster; photo.thumbnail.pause(); }
      preview.draggable = false;
      photo.thumbnail.replaceWith(preview);
      photo.media.prepend(photo.thumbnail);
      photo.media.classList.remove('is-in-viewer');
    }
  }

  function paint() {
    for (const panel of panels) {
      panel.slide.style.transform = `translate3d(${panel.offset * stage.clientWidth + dragX}px, ${dragY}px, 0)`;
    }

    dialog.style.setProperty('--viewer-opacity', String(1 - Math.min(Math.abs(dragY) / 600, 0.65)));
  }

  function render() {
    dragX = dragY = 0;
    pointers.clear();
    const oldPanels = panels;
    panels = [];
    for (const offset of [-3, -2, -1, 0, 1, 2, 3]) {
      const photo = photos[index + offset];
      if (!photo) continue;
      const existing = panelCache.get(index + offset);
      if (existing) {
        fitFrame(photo, existing.frame);
        existing.offset = offset;
        existing.slide.setAttribute('aria-hidden', String(offset !== 0));
        stage.append(existing.slide);
        panels.push(existing);
        continue;
      }
      const slide = document.createElement('div');
      slide.className = 'lightbox-slide';
      slide.setAttribute('aria-hidden', String(offset !== 0));
      const frame = document.createElement('div');
      frame.className = 'lightbox-frame';
      fitFrame(photo, frame);
      const preview = new Image();
      preview.src = photo.data.kind === 'video' ? photo.data.poster : photo.thumbnail.currentSrc || photo.data.src;
      preview.alt = photo.thumbnail.alt;
      preview.draggable = false;
      if (photo.data.kind !== 'video') {
      const full = new Image();
      full.className = 'lightbox-detail';
      full.alt = '';
      full.draggable = false;
      full.decoding = 'async';
      full.fetchPriority = offset === 0 ? 'high' : 'low';
      full.onload = async () => {
        try { await full.decode(); } catch { /* Keep the thumbnail if decoding fails. */ }
        photo.intrinsicRatio = full.naturalWidth / full.naturalHeight;
        if (frame.isConnected && !busy) fitFrame(photo, frame);
        full.classList.add('is-loaded');
      };
      full.onerror = () => full.remove();
      full.src = photo.data.full || photo.data.src;
      frame.append(preview, full);
      } else frame.append(preview);
      slide.append(frame);
      stage.append(slide);
      const panel = {offset, slide, frame, photoIndex:index + offset};
      panels.push(panel);
      panelCache.set(panel.photoIndex, panel);
    }
    for (const panel of oldPanels) {
      if (!panels.includes(panel)) { restoreThumbnail(panel); panel.slide.remove(); }
    }
    // Retain recently decoded panels for immediate backtracking, with bounded memory.
    for (const [key, panel] of panelCache) {
      if (panelCache.size <= 12) break;
      if (!panels.includes(panel)) panelCache.delete(key);
    }
    panels.filter(panel => panel.offset !== 0).forEach(restoreThumbnail);
    const active = current();
    const photo = photos[index];
    if (!photo.thumbnail.src) photo.thumbnail.src = photo.data.src;
    if (photo.thumbnail.parentElement !== active.frame && (photo.data.kind === 'video' || photo.thumbnail.naturalWidth > 0)) {
      active.frame.firstElementChild.replaceWith(photo.thumbnail);
      photo.media.classList.add('is-in-viewer');
    }
    dialog.querySelector('.lightbox-count').textContent = `${index + 1} / ${photos.length}`;
    dialog.querySelector('.lightbox-title').textContent = photos[index].caption;
    const caption = dialog.querySelector('.lightbox-caption');
    caption.textContent = photos[index].description;
    caption.hidden = !photos[index].description;
    syncVideoPlayback();
    paint();
  }

  // Keep final animation styles until the caller has committed its DOM changes.
  // Cancelling here causes a one-frame jump back to the full-size image on close.
  function animate(element, frames, ms) {
    const animation = element.animate(frames, {duration: duration(ms), easing: 'cubic-bezier(.22, .8, .2, 1)', fill: 'both'});
    return animation;
  }

  async function finish(animations, commit) {
    await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
    commit();
    animations.forEach(animation => animation.cancel());
  }

  function thumbnailTransform(rect) {
    const frame = current().frame.getBoundingClientRect();
    const scale = Math.min(rect.width / frame.width, rect.height / frame.height);
    return `translate(${rect.x + rect.width / 2 - frame.x - frame.width / 2}px, ${rect.y + rect.height / 2 - frame.y - frame.height / 2}px) scale(${scale})`;
  }

  async function open(at, button) {
    if (dialog.open) return;
    index = at; opener = button; busy = true;
    const rect = photos[index].media.getBoundingClientRect();
    oldOverflow = document.documentElement.style.overflow;
    oldPadding = document.body.style.paddingRight;
    const scrollbar = innerWidth - document.documentElement.clientWidth;
    if (scrollbar) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.documentElement.style.overflow = 'hidden';
    dialog.classList.add('is-opening');
    dialog.showModal(); render(); dialog.focus({preventScroll:true});
    const from = thumbnailTransform(rect);
    await finish([
      animate(current().frame, [{transform: from}, {transform: 'none'}], 340),
      animate(backdrop, [{opacity:0}, {opacity:1}], 340),
      ...chrome.map(element => animate(element, [{opacity:0}, {opacity:1}], 340)),
    ], () => {
      dialog.classList.remove('is-opening');
      busy = false;
      const queued = queuedNavigation;
      queuedNavigation = 0;
      if (queued) navigate(queued);
    });
  }

  async function close() {
    if (!dialog.open || busy) return;
    stopMotion();
    queuedNavigation = 0;
    busy = true;
    const frame = current().frame;
    const rect = photos[index].media.getBoundingClientRect();
    // Use the active image's grid position even when it is offscreen.
    // The viewport clips the image naturally as it travels back to its thumbnail.
    const destination = thumbnailTransform(rect);
    await finish([
      animate(frame, [{transform:'none',opacity:1}, {transform:destination,opacity:1}], 300),
      animate(backdrop, [{opacity:getComputedStyle(backdrop).opacity}, {opacity:0}], 300),
      ...panels.filter(panel => panel.offset !== 0).map(panel => animate(panel.slide, [{opacity:1}, {opacity:0}], 180)),
      ...chrome.map(element => animate(element, [{opacity:1}, {opacity:0}], 180)),
    ], () => {
      panels.forEach(restoreThumbnail);
      dialog.close(); stage.replaceChildren(); panels = []; pointers.clear();
      document.documentElement.style.overflow = oldOverflow;
      document.body.style.paddingRight = oldPadding;
      opener?.focus({preventScroll:true}); busy = false;
      requestAnimationFrame(syncVideoPlayback);
    });
  }

  // Preserve the exact on-screen positions when a new input interrupts a glide.
  // Navigation never waits for image decoding or a previous animation to finish.
  function stopMotion() {
    const positions = new Map(panels.map(panel => [panel.photoIndex, getComputedStyle(panel.slide).transform]));
    motionVersion++;
    motion.forEach(animation => animation.cancel());
    motion = [];
    panels.forEach(panel => { panel.slide.style.transform = positions.get(panel.photoIndex); });
    return positions;
  }

  function glide(positions, referenceIndex = index, referenceX = 0) {
    const version = ++motionVersion;
    const width = stage.clientWidth;
    motion = panels.map(panel => animate(panel.slide, [
      {transform: positions.get(panel.photoIndex) || `translate3d(${referenceX + (panel.photoIndex-referenceIndex)*width}px, 0, 0)`},
      {transform: `translate3d(${panel.offset*width}px, 0, 0)`},
    ], 200));
    const running = motion;
    Promise.all(running.map(animation => animation.finished.catch(() => {}))).then(() => {
      if (version !== motionVersion) return;
      dragX = dragY = 0;
      paint();
      running.forEach(animation => animation.cancel());
      motion = [];
    });
  }

  function navigate(direction) {
    if (!dialog.open) return;
    if (busy) {
      if (dialog.classList.contains('is-opening')) queuedNavigation += direction;
      return;
    }
    const target = Math.max(0, Math.min(photos.length-1, index+direction));
    if (target === index) return settle();
    const positions = stopMotion();
    const referenceIndex = index;
    const referenceX = new DOMMatrixReadOnly(positions.get(index)).m41;
    index = target;
    render();
    glide(positions, referenceIndex, referenceX);
  }

  function settle() {
    if (busy) return;
    glide(stopMotion());
  }

  stage.addEventListener('pointerdown', event => {
    if (busy || event.button !== 0) return;
    if (!pointers.size) {
      const positions = stopMotion();
      const matrix = new DOMMatrixReadOnly(positions.get(index));
      dragX = matrix.m41; dragY = matrix.m42;
    }
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, {x:event.clientX, y:event.clientY});
    if (pointers.size === 1) {
      start = {x:event.clientX, y:event.clientY, time:performance.now(), dragX, target:event.target};
      axis = null; moved = false; multi = false;
    } else {
      multi = true;
    }
  });

  stage.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId) || busy) return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if (multi || !start) return;
    const dx = event.clientX-start.x, dy = event.clientY-start.y;
    if (Math.hypot(dx,dy)>6) moved = true;
    if (!axis && moved) axis = Math.abs(dx)>Math.abs(dy) ? 'x' : 'y';
    if (axis === 'x') dragX = start.dragX + dx * ((index === 0 && dx>0) || (index === photos.length-1 && dx<0) ? .25 : 1);
    if (axis === 'y') dragY = dy;
    paint();
  });

  function endGesture(event) {
    if (!pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);
    if (pointers.size) return;
    if (busy) return;
    if (event.type === 'pointercancel' || multi) { return settle(); }
    const elapsed = Math.max(1,performance.now()-start.time);
    const swipeX = event.clientX - start.x;
    if (axis === 'x' && (Math.abs(swipeX)>stage.clientWidth*.18 || Math.abs(swipeX)/elapsed>.5)) {
      navigate(swipeX<0 ? 1 : -1);
    } else if (axis === 'y' && (Math.abs(dragY)>100 || Math.abs(dragY)/elapsed>.6)) close();
    else if (moved) settle();
    else if (start.target.classList.contains('lightbox-slide')) close();
  }
  stage.addEventListener('pointerup',endGesture);
  stage.addEventListener('pointercancel',endGesture);
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  dialog.addEventListener('keydown',event=>{
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navigate(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  window.addEventListener('resize',()=>{
    if (!dialog.open || busy) return;
    stopMotion();
    panels.forEach(restoreThumbnail); stage.replaceChildren(); panels = []; panelCache.clear(); render();
  });

  window.portfolioLightbox = {
    add(data, thumbnail, media, caption, description = '') {
      const at = photos.length;
      const photo = {data, thumbnail, media, caption, description};
      photos.push(photo);
      if (data.kind === 'video') {
        thumbnail.addEventListener('loadedmetadata', () => {
          data.width = thumbnail.videoWidth; data.height = thumbnail.videoHeight;
          const panel = panelCache.get(at);
          if (panel && !busy) fitFrame(photo, panel.frame);
        });
      }
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'gallery-open';
      button.setAttribute('aria-label', `View ${caption}`);
      button.addEventListener('click',()=>open(at,button));
      media.append(button);
    },
    reset() { photos.length = 0; panelCache.clear(); },
  };
})();
