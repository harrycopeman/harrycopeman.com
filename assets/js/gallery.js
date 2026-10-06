(() => {
  const endpoint = '/api/portfolio';
  const track = document.querySelector('.gallery-track');
  const status = document.querySelector('.gallery-status');
  const retry = document.querySelector('.gallery-retry');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pendingImages = new WeakMap();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      pendingImages.get(entry.target)?.();
    }
  }, { rootMargin: '500px' });

  function showSkeletons() {
    const placeholders = document.createDocumentFragment();
    for (let index = 0; index < 15; index++) {
      const figure = document.createElement('div');
      figure.className = 'gallery-item gallery-skeleton';
      figure.setAttribute('aria-hidden', 'true');
      const media = document.createElement('div');
      media.className = 'gallery-media';
      media.style.aspectRatio = [0.8, 1.25, 0.75, 1, 1.5][index % 5];
      const caption = document.createElement('div');
      caption.className = 'skeleton-caption';
      figure.append(media, caption);
      placeholders.append(figure);
    }
    track.replaceChildren(placeholders);
  }

  function revealImage(media, image) {
    if (reducedMotion.matches) {
      media.classList.add('is-ready');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.className = 'pixel-preview';
    canvas.setAttribute('aria-hidden', 'true');
    const context = canvas.getContext('2d');
    if (!context) {
      media.classList.add('is-ready');
      return;
    }
    media.append(canvas);
    media.classList.add('is-revealing');
    const steps = [16, 48, 96];
    let step = 0;
    function renderStep() {
      if (!media.isConnected) return;
      if (step === steps.length || reducedMotion.matches) {
        media.classList.add('is-ready');
        setTimeout(() => canvas.remove(), 120);
        return;
      }
      canvas.width = steps[step++];
      canvas.height = Math.max(1, Math.round(canvas.width * image.naturalHeight / image.naturalWidth));
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      setTimeout(renderStep, 45);
    }
    renderStep();
  }

  const videoObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const video = entry.target;
      if (video.closest('.lightbox')) continue;
      const rect = video.getBoundingClientRect();
      if (rect.bottom > -100 && rect.top < innerHeight + 100 && !document.querySelector('.lightbox[open]')) {
        if (!video.src) video.src = video.dataset.src;
        video.play().catch(() => {});
      } else video.pause();
    }
  }, { rootMargin: '100px' });

  function createVideoFigure(block) {
    const data = block.video;
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';
    const media = document.createElement('div');
    media.className = 'gallery-media';
    media.style.aspectRatio = `${data.width || 16} / ${data.height || 9}`;
    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = data.poster;
    video.dataset.src = data.src;
    video.setAttribute('aria-label', block.title || 'Portfolio video');
    video.addEventListener('loadedmetadata', () => {
      data.width = video.videoWidth;
      data.height = video.videoHeight;
      media.style.aspectRatio = `${data.width} / ${data.height}`;
    });
    video.addEventListener('loadeddata', () => media.classList.add('is-ready'));
    video.addEventListener('error', () => {
      media.classList.add('has-error');
      if (media.querySelector('.image-retry')) return;
      const retryVideo = document.createElement('button');
      retryVideo.className = 'image-retry';
      retryVideo.type = 'button';
      retryVideo.textContent = 'Video unavailable · Retry';
      retryVideo.onclick = () => {
        retryVideo.remove(); media.classList.remove('has-error'); video.load();
        video.play().catch(() => {});
      };
      media.append(retryVideo);
    });
    const caption = document.createElement('figcaption');
    caption.textContent = block.description?.plain?.trim() || block.title || 'Untitled';
    media.append(video);
    window.portfolioLightbox.add(data, video, media, caption.textContent);
    figure.append(media, caption);
    videoObserver.observe(video);
    return figure;
  }

  function createFigure(block) {
    if (block.type === 'Video' && block.video?.src) return createVideoFigure(block);
    if (block.type !== 'Image' || !block.image?.src) return null;

    const figure = document.createElement('figure');
    figure.className = 'gallery-item';
    const media = document.createElement('div');
    media.className = 'gallery-media';
    const width = block.image.width || 800;
    const height = block.image.height || 1000;
    media.style.aspectRatio = `${width} / ${height}`;
    const image = document.createElement('img');
    image.alt = block.image.alt_text || block.title || 'Portfolio image';
    image.decoding = 'async';
    image.width = width;
    image.height = height;

    image.onload = async () => {
      if (media.classList.contains('is-ready')) return;
      try { await image.decode(); } catch { /* The loaded image is still usable. */ }
      if (media.isConnected) revealImage(media, image);
    };
    image.onerror = () => {
      media.classList.add('has-error');
      const button = document.createElement('button');
      button.className = 'image-retry';
      button.type = 'button';
      button.textContent = 'Image unavailable · Retry';
      button.addEventListener('click', () => {
        button.remove();
        media.classList.remove('has-error');
        image.src = block.image.src;
      });
      media.append(button);
    };
    media.append(image);
    pendingImages.set(media, () => {
      image.sizes = `${Math.ceil(media.getBoundingClientRect().width)}px`;
      if (block.image.srcset) image.srcset = block.image.srcset;
      image.fetchPriority = media.getBoundingClientRect().top < window.innerHeight ? 'high' : 'low';
      image.src = block.image.src;
    });
    observer.observe(media);

    const caption = document.createElement('figcaption');
    caption.textContent = block.description?.plain?.trim() || block.title || 'Untitled';
    window.portfolioLightbox.add(block.image, image, media, caption.textContent);
    figure.append(media, caption);
    return figure;
  }

  async function loadGallery() {
    retry.hidden = true;
    status.hidden = false;
    status.textContent = 'Loading selected work…';
    track.setAttribute('aria-busy', 'true');
    observer.disconnect();
    videoObserver.disconnect();
    window.portfolioLightbox.reset();
    showSkeletons();
    let imageCount = 0;
    let page = 1;

    try {
      do {
        const response = await fetch(`${endpoint}?per=100&page=${page}`, {
          signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw new Error(`Are.na returned ${response.status}`);
        const result = await response.json();
        if (!Array.isArray(result.data)) throw new Error('Unexpected channel response');

        track.querySelectorAll('.gallery-skeleton').forEach(element => element.remove());
        for (const block of result.data) {
          const figure = createFigure(block);
          if (figure) {
            track.append(figure);
            imageCount++;
          }
        }
        status.hidden = imageCount > 0;
        const nextPage = result.meta?.next_page;
        page = Number.isInteger(nextPage) && nextPage > page ? nextPage : null;
      } while (page);

      if (!imageCount) status.textContent = 'No images or videos in this collection yet.';
    } catch (error) {
      status.hidden = false;
      status.textContent = imageCount
        ? 'Some images could not be loaded.'
        : 'The portfolio is temporarily unavailable.';
      retry.hidden = false;
      console.warn('Could not load the portfolio:', error);
    } finally {
      track.querySelectorAll('.gallery-skeleton').forEach(element => element.remove());
      track.setAttribute('aria-busy', 'false');
    }
  }

  retry.addEventListener('click', loadGallery);
  loadGallery();
})();
