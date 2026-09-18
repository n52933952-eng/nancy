const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("ffmpeg-static");

const root = process.cwd();
const images = [
  "slide-coffee.jpg",
  "slide-fur.jpg",
  "slide-street.jpg",
  "slide-box.jpg",
  "slide-jewels.jpg",
  "slide-blue-glam.jpg",
  "slide-red.jpg",
  "slide-gala.webp",
  "slide-closeup.jpg",
].map((name) => path.join(root, "public", "images", name));

const audio = path.join(root, "public", "audio", "home-theme.mp3");
const outDir = path.join(root, "public", "video");
const slidesOut = path.join(outDir, "slides-only.mp4");
const clipOut = path.join(outDir, "home-clip.mp4");
fs.mkdirSync(outDir, { recursive: true });

function run(args) {
  console.log("ffmpeg", args.join(" "));
  const result = spawnSync(ffmpeg, args, { encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr);
    process.exit(result.status || 1);
  }
}

const secondsEach = 6;
const args = [];
for (const image of images) {
  args.push("-loop", "1", "-t", String(secondsEach), "-i", image);
}

const n = images.length;
const scale =
  "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0b0614,setsar=1,fps=25,format=yuv420p";
const parts = images.map((_, i) => `[${i}:v]${scale}[v${i}]`).join(";");
const concat = images.map((_, i) => `[v${i}]`).join("") + `concat=n=${n}:v=1:a=0[v]`;

args.push(
  "-filter_complex",
  `${parts};${concat}`,
  "-map",
  "[v]",
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-crf",
  "20",
  "-tune",
  "stillimage",
  "-y",
  slidesOut,
);

run(args);

run([
  "-stream_loop",
  "-1",
  "-i",
  slidesOut,
  "-i",
  audio,
  "-shortest",
  "-map",
  "0:v",
  "-map",
  "1:a",
  "-c:v",
  "copy",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  "-movflags",
  "+faststart",
  "-y",
  clipOut,
]);

console.log("CLIP", clipOut, fs.statSync(clipOut).size);
