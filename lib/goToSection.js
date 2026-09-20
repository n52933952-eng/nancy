const SECTION_KEY = "nancy-section";

export function rememberSection(key) {
  try {
    sessionStorage.setItem(SECTION_KEY, key);
  } catch {
    /* ignore */
  }
}

export function peekRememberedSection() {
  try {
    return sessionStorage.getItem(SECTION_KEY);
  } catch {
    return null;
  }
}

export function clearRememberedSection() {
  try {
    sessionStorage.removeItem(SECTION_KEY);
  } catch {
    /* ignore */
  }
}

export function headerOffset() {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 80) + 16;
}

export function goToSection(key) {
  if (typeof window === "undefined") return;

  if (key === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname || "/");
    return;
  }

  const el = document.getElementById(key);
  if (!el) return;

  const header = headerOffset();
  const titleTop = window.scrollY + el.getBoundingClientRect().top - header;
  let top = titleTop;

  if (key === "gallery" || key === "videos") {
    const end =
      key === "gallery"
        ? el.querySelector(".gallery-dots")
        : el.querySelector(".videos-stage");
    if (end) {
      const pad = 28;
      const endBottom = window.scrollY + end.getBoundingClientRect().bottom;
      const endTop = endBottom - window.innerHeight + pad;
      if (endTop > titleTop) top = endTop;
    }
  } else if (key !== "music") {
    const target =
      el.querySelector(".photo-stage") || el.querySelector(".photo-tile") || el;
    top = window.scrollY + target.getBoundingClientRect().top - header;
  }

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  history.replaceState(null, "", window.location.pathname || "/");
  window.dispatchEvent(new CustomEvent("nancy-section", { detail: key }));
}
