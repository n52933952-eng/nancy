const API = import.meta.env.VITE_API_URL || "http://localhost:8787";
const CDN = import.meta.env.VITE_CDN_URL || "";
const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:3000";

function headers(token, extra = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extra,
  };
}

export function fileUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${SITE.replace(/\/$/, "")}${path}`;
  return `${CDN.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function login(password) {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Login failed");
  return data.token;
}

export async function loadContent(token) {
  try {
    const api = await fetch(`${API}/content`, { headers: headers(token) });
    if (api.ok) {
      const data = await api.json();
      if (data && !data.missing) return data;
    }
  } catch {
    /* Worker not reachable; try the local site copy */
  }

  const seed = await fetch(`${SITE}/api/content`);
  if (!seed.ok) throw new Error("Could not load site content. Keep the website running on localhost:3000.");
  return seed.json();
}

export async function saveContent(token, content) {
  const response = await fetch(`${API}/content`, {
    method: "PUT",
    headers: headers(token, { "Content-Type": "application/json" }),
    body: JSON.stringify(content),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Save failed");
}

export async function uploadFile(token, file, folder) {
  const safe = file.name.replace(/[^\w.\-]+/g, "-").toLowerCase();
  const path = `${folder}/${Date.now()}-${safe}`;
  const response = await fetch(`${API}/upload`, {
    method: "POST",
    headers: headers(token, {
      "Content-Type": file.type || "application/octet-stream",
      "X-File-Path": path,
    }),
    body: file,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Upload failed");
  return data.path;
}
