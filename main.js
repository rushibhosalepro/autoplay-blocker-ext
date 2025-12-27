const stopAutoplayVideos = () => {
  const media = document.querySelectorAll("video", "audio");
  media.forEach((m) => {
    if (!m.paused) {
      m.pause();
    }
    m.removeAttribute("autoplay");
    m.autoplay = false;

    m.addEventListener(
      "play",
      (e) => {
        e.preventDefault();
        m.pause();
      },
      true
    );
  });
};

stopAutoplayVideos();
const observer = new MutationObserver(() => {
  stopAutoplayVideos();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

window.addEventListener("DOMContentLoaded", stopAutoplayVideos);
