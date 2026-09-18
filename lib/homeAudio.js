let audio;
let wanted = true;
let playRequest = null;

export function getHomeAudio(src) {
  if (typeof window === "undefined") return null;

  if (!audio) {
    audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.55;
  }

  return audio;
}

export function tryPlay() {
  if (!audio || !wanted || !audio.paused) return playRequest || Promise.resolve();
  if (playRequest) return playRequest;

  playRequest = audio.play().finally(() => {
    playRequest = null;
  });

  return playRequest.catch(() => {});
}

export function pauseHome() {
  wanted = false;
  playRequest = null;
  audio?.pause();
}

export function resumeHome() {
  wanted = true;
  return tryPlay();
}
