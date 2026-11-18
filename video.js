/* 無音再生。画面外・非表示タブでは停止し、手動の一時停止を尊重。 */
(() => {
  'use strict';
  const video = document.querySelector('#campaign-video');
  if (!video) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = !('IntersectionObserver' in window);
  let userPaused = false;
  let internalPause = false;
  video.muted = true;
  function pause() {
    if (video.paused) return;
    internalPause = true;
    video.pause();
  }
  function sync() {
    if (document.hidden || !visible) { pause(); return; }
    if (!motion.matches && !userPaused && video.paused) {
      const attempt = video.play();
      if (attempt?.catch) attempt.catch(() => {});
    }
  }
  video.addEventListener('pause', () => {
    if (internalPause) internalPause = false;
    else userPaused = true;
  });
  video.addEventListener('play', () => { userPaused = false; });
  motion.addEventListener('change', () => { if (motion.matches) pause(); else sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', pause);
  window.addEventListener('pageshow', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }, { threshold: 0.1 }).observe(video);
  }
  sync();
})();
