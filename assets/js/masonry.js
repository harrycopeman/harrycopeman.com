(() => {
  const track = document.querySelector('.gallery-track');
  const observed = new Set();
  let scheduled = false;
  let trackWidth = 0;
  let lastColumns = 0;

  function scheduleLayout() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      const items = [...track.children];
      if (!items.length) return;
      const style = getComputedStyle(track);
      const columns = Number(style.getPropertyValue('--gallery-columns'));
      if (columns !== lastColumns) {
        items.forEach((item, index) => { item.style.gridColumn = String(index % columns + 1); });
        lastColumns = columns;
      }
      const gap = Number.parseFloat(style.getPropertyValue('--gallery-row-gap'));
      const bottoms = Array(columns).fill(0);
      // Measure intrinsic heights before writing placement styles.
      const heights = items.map(item => Math.ceil(item.getBoundingClientRect().height));
      track.classList.add('is-masonry');
      items.forEach((item, index) => {
        // Cycle across columns in source order; each column stacks independently.
        const column = index % columns;
        const height = Math.max(1, heights[index]);
        item.style.gridColumn = String(column + 1);
        item.style.gridRow = `${bottoms[column] + 1} / span ${height}`;
        bottoms[column] += height + gap;
      });
    });
  }

  const sizes = new ResizeObserver(entries => {
    if (entries.some(entry => {
      if (entry.target !== track) return true;
      const changed = entry.contentRect.width !== trackWidth;
      trackWidth = entry.contentRect.width;
      return changed;
    })) scheduleLayout();
  });
  sizes.observe(track);

  function observeItems() {
    for (const item of observed) {
      if (item.parentElement !== track) { sizes.unobserve(item); observed.delete(item); }
    }
    for (const item of track.children) {
      if (!observed.has(item)) { observed.add(item); sizes.observe(item); }
    }
    scheduleLayout();
  }
  new MutationObserver(observeItems).observe(track, {childList: true});
  observeItems();
})();
