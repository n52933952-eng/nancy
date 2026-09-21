export function youtubeId(value) {
  if (!value) return "";
  const text = String(value).trim();
  if (/^[\w-]{11}$/.test(text)) return text;

  try {
    const url = new URL(text);
    if (url.hostname.includes("youtu.be")) return url.pathname.replace("/", "").slice(0, 11);
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    const path = url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
    if (path) return path[1];
  } catch {
    /* not a url */
  }

  return "";
}

export function youtubePoster(value, fallback = "") {
  const id = youtubeId(value);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : fallback;
}

export function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve(null);

  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };

    if (!document.querySelector("script[src*='youtube.com/iframe_api']")) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
}
