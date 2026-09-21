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
  return header?.getBoundingClientRect().height ?? 80;
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

  el.querySelectorAll(".section-reveal").forEach((node) => {
    node.classList.add("opacity-100");
    node.classList.remove("opacity-0");
  });
  void el.offsetHeight;

  if (key === "videos") {
    const header = headerOffset();
    const titleTop = window.scrollY + el.getBoundingClientRect().top - header;
    const end = el.querySelector(".videos-stage");
    let top = titleTop;
    if (end) {
      const endBottom = window.scrollY + end.getBoundingClientRect().bottom;
      const endTop = endBottom - window.innerHeight + 28;
      if (endTop > titleTop) top = endTop;
    }
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  history.replaceState(null, "", window.location.pathname || "/");
  window.dispatchEvent(new CustomEvent("nancy-section", { detail: key }));
}
