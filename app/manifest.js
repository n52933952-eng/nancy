export default function manifest() {
  return {
    name: "Nancy Ajram | نانسي عجرم",
    short_name: "Nancy Ajram",
    description: "Nancy Ajram fan site — songs, videos, photos and biography.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0512",
    theme_color: "#0a0512",
    icons: [
      { src: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
