const videoAudioPlatforms = [
  "youtube.com",
  "youtube-nocookie.com",
  "vimeo.com",
  "dailymotion.com",
  "twitch.tv",
  "soundcloud.com",
  "spotify.com",
  "bandcamp.com",
  "facebook.com/plugins/video",
  "player.vimeo.com",
  "embed.music.apple.com",
];

const sanitizeMedia = (mediaElement) => {
  if (mediaElement.dataset.autoplaySanitized) return;
  mediaElement.dataset.autoplaySanitized = "true";

  mediaElement.removeAttribute("autoplay");
  mediaElement.autoplay = false;
  mediaElement.pause();

  mediaElement.play = function () {
    return Promise.reject("Autoplay disabled");
  };
};

const sanitizeIframe = (iframe) => {
  if (iframe.dataset.autoplaySanitized) return;
  iframe.dataset.autoplaySanitized = "true";

  const src = iframe.src;
  if (!src) return;

  if (videoAudioPlatforms.some((platform) => src.includes(platform))) {
    iframe.src = src.replace(/autoplay=1/gi, "autoplay=0");

    const allow = iframe.getAttribute("allow") || "";
    iframe.setAttribute(
      "allow",
      allow
        .split(";")
        .filter((a) => !/autoplay/i.test(a))
        .join(";")
    );
  }
};
const stopAutoplay = () => {
  document
    .querySelectorAll(
      "video:not([data-autoplay-sanitized], audio:not([data-autoplay-sanitized])"
    )
    .forEach(sanitizeMedia);
  document
    .querySelectorAll("iframe:not([data-autoplay-sanitized])")
    .forEach(sanitizeIframe);
};

stopAutoplay();

const observer = new MutationObserver(stopAutoplay);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

window.addEventListener("DOMContentLoaded", stopAutoplay);
