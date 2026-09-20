const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, X-File-Path",
  "Access-Control-Allow-Methods": "GET, PUT, POST, OPTIONS",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

function authorized(request, env) {
  const header = request.headers.get("Authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  return Boolean(token && env.ADMIN_PASSWORD && token === env.ADMIN_PASSWORD);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);

    if (url.pathname === "/login" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      if (!body.password || body.password !== env.ADMIN_PASSWORD) {
        return json({ error: "Wrong password" }, 401);
      }
      return json({ token: body.password });
    }

    if (!authorized(request, env)) {
      return json({ error: "Unauthorized" }, 401);
    }

    if (url.pathname === "/content" && request.method === "GET") {
      const object = await env.MEDIA.get("content/site.json");
      if (!object) return json({ missing: true });
      return new Response(await object.text(), {
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    if (url.pathname === "/content" && request.method === "PUT") {
      const body = await request.text();
      try {
        JSON.parse(body);
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      await env.MEDIA.put("content/site.json", body, {
        httpMetadata: { contentType: "application/json" },
      });
      return json({ saved: true });
    }

    if (url.pathname === "/upload" && request.method === "POST") {
      const path = (request.headers.get("X-File-Path") || "").replace(/^\/+/, "");
      if (!path || path.includes("..") || path.startsWith("content/")) {
        return json({ error: "Bad file path" }, 400);
      }
      const bytes = await request.arrayBuffer();
      if (!bytes.byteLength) return json({ error: "Empty file" }, 400);
      await env.MEDIA.put(path, bytes, {
        httpMetadata: {
          contentType: request.headers.get("Content-Type") || "application/octet-stream",
        },
      });
      return json({ path });
    }

    return json({ error: "Not found" }, 404);
  },
};
