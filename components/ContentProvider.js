"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent, mergeLive } from "@/lib/content";

const ContentContext = createContext(defaultContent);

export function ContentProvider({ children, initial = null }) {
  const [content, setContent] = useState(() => mergeLive(initial));

  useEffect(() => {
    fetch("/api/live", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((live) => {
        if (live && !live.missing) setContent(mergeLive(live));
      })
      .catch(() => {});
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
