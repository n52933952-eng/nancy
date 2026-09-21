import { useEffect, useState } from "react";
import { heroTone, heroToneLabels, themeKey } from "./heroTone";
import { fileUrl, loadContent, login, saveContent, uploadFile } from "./api";

const TABS = [
  ["home", "Home photos"],
  ["music", "Music"],
  ["videos", "Videos"],
  ["gallery", "Gallery"],
  ["biography", "Biography"],
  ["news", "News"],
  ["texts", "Texts"],
];

const THEMES = Object.keys(heroTone);

function slug(value) {
  return (
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `item-${Date.now()}`
  );
}

function Pair({ label, value = {}, onChange }) {
  return (
    <div className="grid2">
      <div className="field">
        <label>{label} EN</label>
        <input value={value.en || ""} onChange={(event) => onChange({ ...value, en: event.target.value })} />
      </div>
      <div className="field">
        <label>{label} AR</label>
        <input
          dir="rtl"
          value={value.ar || ""}
          onChange={(event) => onChange({ ...value, ar: event.target.value })}
        />
      </div>
    </div>
  );
}

function PairArea({ label, value = {}, onChange }) {
  return (
    <div className="grid2">
      <div className="field">
        <label>{label} EN</label>
        <textarea rows={5} value={value.en || ""} onChange={(event) => onChange({ ...value, en: event.target.value })} />
      </div>
      <div className="field">
        <label>{label} AR</label>
        <textarea
          dir="rtl"
          rows={5}
          value={value.ar || ""}
          onChange={(event) => onChange({ ...value, ar: event.target.value })}
        />
      </div>
    </div>
  );
}

function FilePick({ token, folder, accept, label, onPath }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="ghost" style={{ display: "inline-flex", alignItems: "center" }}>
      {busy ? "Uploading…" : label}
      <input
        type="file"
        accept={accept}
        hidden
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          setBusy(true);
          try {
            onPath(await uploadFile(token, file, folder));
          } catch (error) {
            window.alert(error.message);
          } finally {
            setBusy(false);
          }
        }}
      />
    </label>
  );
}

export default function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem("nancy-admin") || "");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState("home");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function onLogin(event) {
    event.preventDefault();
    setError("");
    try {
      const next = await login(password);
      sessionStorage.setItem("nancy-admin", next);
      setToken(next);
      setContent(await loadContent(next));
    } catch (err) {
      setError(err.message);
    }
  }

  async function boot() {
    try {
      setContent(await loadContent(token));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (token && !content) boot();
  }, [token]);

  function patch(partial) {
    setContent((current) => ({ ...current, ...partial }));
  }

  async function onSave() {
    setError("");
    setStatus("Saving…");
    try {
      const payload = {
        ...content,
        slides: (content.slides || []).map((slide) => ({
          ...slide,
          theme: themeKey(slide.theme),
        })),
      };
      await saveContent(token, payload);
      setStatus("Saved. Refresh the website to see it.");
    } catch (err) {
      setStatus("");
      setError(err.message);
    }
  }

  if (!token) {
    return (
      <div className="login">
        <form className="login-card" onSubmit={onLogin}>
          <h1>Nancy Admin</h1>
          <p>Control photos, music, videos, gallery and text.</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? <p className="err">{error}</p> : null}
          <button className="gold" type="submit">
            Enter
          </button>
        </form>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="login">
        <p>{error || "Loading…"}</p>
      </div>
    );
  }

  return (
    <div className="shell">
      <aside className="side">
        <h1>Nancy Admin</h1>
        {TABS.map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} type="button" onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </aside>
      <main className="main">
        <div className="top">
          <div>
            <h2 style={{ margin: 0 }}>{TABS.find(([id]) => id === tab)?.[1]}</h2>
            <p className="hint">Upload files, edit text, then Save to Cloudflare.</p>
          </div>
          <button className="gold" type="button" onClick={onSave}>
            Save to website
          </button>
        </div>
        {status ? <p className="msg">{status}</p> : null}
        {error ? <p className="err">{error}</p> : null}

        {tab === "home" ? <HomeEditor token={token} content={content} patch={patch} /> : null}
        {tab === "music" ? <MusicEditor token={token} content={content} patch={patch} /> : null}
        {tab === "videos" ? <VideosEditor token={token} content={content} patch={patch} /> : null}
        {tab === "gallery" ? <GalleryEditor token={token} content={content} patch={patch} /> : null}
        {tab === "biography" ? <BioEditor token={token} content={content} patch={patch} /> : null}
        {tab === "news" ? <NewsEditor token={token} content={content} patch={patch} /> : null}
        {tab === "texts" ? <TextsEditor content={content} patch={patch} /> : null}
      </main>
    </div>
  );
}

function HomeEditor({ token, content, patch }) {
  const slides = content.slides || [];
  function update(index, next) {
    patch({ slides: slides.map((slide, i) => (i === index ? { ...slide, ...next } : slide)) });
  }
  return (
    <div>
      {slides.map((slide, index) => (
        <article className="card" key={`${slide.src}-${index}`}>
          <div className="row">
            <img className="preview" src={fileUrl(slide.src)} alt="" />
            <div>
              <Pair label="Caption" value={slide.caption} onChange={(caption) => update(index, { caption })} />
              <div className="field">
                <label>Alt text</label>
                <input value={slide.alt || ""} onChange={(event) => update(index, { alt: event.target.value })} />
              </div>
              <div className="field">
                <label>Text color theme</label>
                <div className="theme-picks">
                  {THEMES.map((name) => (
                    <button
                      key={name}
                      type="button"
                      className={themeKey(slide.theme) === name ? "theme-pick on" : "theme-pick"}
                      onClick={() => update(index, { theme: name })}
                    >
                      <span
                        className="theme-swatch"
                        style={{
                          background: heroTone[name].accent,
                          boxShadow: `0 0 12px ${heroTone[name].accent}`,
                        }}
                      />
                      {heroToneLabels[name] || name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="actions">
                <FilePick token={token} folder="images" accept="image/*" label="Change photo" onPath={(src) => update(index, { src })} />
                <button className="danger" type="button" onClick={() => patch({ slides: slides.filter((_, i) => i !== index) })}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
      <button
        className="ghost"
        type="button"
        onClick={() =>
          patch({
            slides: [
              ...slides,
              { src: "", position: "center 18%", alt: "", caption: { en: "New photo", ar: "صورة جديدة" }, theme: "night" },
            ],
          })
        }
      >
        Add home photo
      </button>
    </div>
  );
}

function MusicEditor({ token, content, patch }) {
  const albums = content.albums || [];
  function updateAlbum(index, next) {
    patch({ albums: albums.map((album, i) => (i === index ? { ...album, ...next } : album)) });
  }
  return (
    <div>
      {albums.map((album, index) => (
        <article className="card" key={album.id}>
          <div className="row">
            <img className="preview sq" src={fileUrl(album.cover)} alt="" />
            <div>
              <Pair label="Album title" value={album.title} onChange={(title) => updateAlbum(index, { title })} />
              <div className="grid2">
                <div className="field">
                  <label>Year</label>
                  <input value={album.year || ""} onChange={(event) => updateAlbum(index, { year: event.target.value })} />
                </div>
                <div className="field">
                  <label>Album id</label>
                  <input value={album.id} onChange={(event) => updateAlbum(index, { id: slug(event.target.value) })} />
                </div>
              </div>
              <div className="actions">
                <FilePick token={token} folder="images" accept="image/*" label="Change cover" onPath={(cover) => updateAlbum(index, { cover })} />
                <button className="danger" type="button" onClick={() => patch({ albums: albums.filter((_, i) => i !== index) })}>
                  Delete album
                </button>
              </div>
            </div>
          </div>
          <div className="tracks">
            {(album.tracks || []).map((track, t) => (
              <div className="card" key={track.id} style={{ background: "#12081c" }}>
                <Pair
                  label="Song"
                  value={track.title}
                  onChange={(title) =>
                    updateAlbum(index, {
                      tracks: album.tracks.map((item, i) => (i === t ? { ...item, title } : item)),
                    })
                  }
                />
                <div className="field">
                  <label>YouTube link</label>
                  <input
                    value={track.youtube || ""}
                    placeholder="https://www.youtube.com/watch?v=..."
                    onChange={(event) =>
                      updateAlbum(index, {
                        tracks: album.tracks.map((item, i) => (i === t ? { ...item, youtube: event.target.value } : item)),
                      })
                    }
                  />
                </div>
                <div className="actions">
                  <FilePick
                    token={token}
                    folder="images"
                    accept="image/*"
                    label="Track cover"
                    onPath={(cover) =>
                      updateAlbum(index, {
                        tracks: album.tracks.map((item, i) => (i === t ? { ...item, cover } : item)),
                      })
                    }
                  />
                  <button
                    className="danger"
                    type="button"
                    onClick={() =>
                      updateAlbum(index, { tracks: album.tracks.filter((_, i) => i !== t) })
                    }
                  >
                    Delete song
                  </button>
                </div>
              </div>
            ))}
            <button
              className="ghost"
              type="button"
              onClick={() =>
                updateAlbum(index, {
                  tracks: [
                    ...(album.tracks || []),
                    { id: `song-${Date.now()}`, title: { en: "New song", ar: "أغنية جديدة" }, youtube: "" },
                  ],
                })
              }
            >
              Add song
            </button>
          </div>
        </article>
      ))}
      <button
        className="ghost"
        type="button"
        onClick={() =>
          patch({
            albums: [
              ...albums,
              {
                id: `album-${Date.now()}`,
                title: { en: "New album", ar: "ألبوم جديد" },
                year: new Date().getFullYear(),
                cover: "",
                tracks: [],
              },
            ],
          })
        }
      >
        Add album
      </button>
    </div>
  );
}

function VideosEditor({ token, content, patch }) {
  const videos = content.videos || [];
  function update(index, next) {
    patch({ videos: videos.map((clip, i) => (i === index ? { ...clip, ...next } : clip)) });
  }
  return (
    <div>
      <p className="hint">Paste the official YouTube link. Do not upload the clip file.</p>
      {videos.map((clip, index) => (
        <article className="card" key={clip.id}>
          <div className="row">
            <img className="preview wide" src={fileUrl(clip.poster)} alt="" />
            <div>
              <Pair label="Title" value={clip.title} onChange={(title) => update(index, { title })} />
              <div className="grid2">
                <div className="field">
                  <label>Year</label>
                  <input value={clip.year || ""} onChange={(event) => update(index, { year: event.target.value })} />
                </div>
                <div className="field">
                  <label>YouTube link</label>
                  <input value={clip.youtube || ""} placeholder="https://www.youtube.com/watch?v=..." onChange={(event) => update(index, { youtube: event.target.value })} />
                </div>
              </div>
              <div className="actions">
                <FilePick token={token} folder="images" accept="image/*" label="Poster image" onPath={(poster) => update(index, { poster })} />
                <button className="danger" type="button" onClick={() => patch({ videos: videos.filter((_, i) => i !== index) })}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
      <button
        className="ghost"
        type="button"
        onClick={() =>
          patch({
            videos: [
              ...videos,
              { id: `clip-${Date.now()}`, title: { en: "New clip", ar: "كليب جديد" }, poster: "", youtube: "", year: new Date().getFullYear() },
            ],
          })
        }
      >
        Add video
      </button>
    </div>
  );
}

function GalleryEditor({ token, content, patch }) {
  return (
    <div>
      <h3>Home gallery slider</h3>
      {(content.gallerySlides || []).map((item, index) => (
        <article className="card" key={`${item.src}-${index}`}>
          <div className="row">
            <img className="preview" src={fileUrl(item.src)} alt="" />
            <div>
              <div className="field">
                <label>Alt</label>
                <input
                  value={item.alt || ""}
                  onChange={(event) =>
                    patch({
                      gallerySlides: content.gallerySlides.map((slide, i) =>
                        i === index ? { ...slide, alt: event.target.value } : slide,
                      ),
                    })
                  }
                />
              </div>
              <div className="actions">
                <FilePick
                  token={token}
                  folder="images"
                  accept="image/*"
                  label="Change photo"
                  onPath={(src) =>
                    patch({
                      gallerySlides: content.gallerySlides.map((slide, i) => (i === index ? { ...slide, src } : slide)),
                    })
                  }
                />
                <button
                  className="danger"
                  type="button"
                  onClick={() => patch({ gallerySlides: content.gallerySlides.filter((_, i) => i !== index) })}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
      <button
        className="ghost"
        type="button"
        onClick={() => patch({ gallerySlides: [...(content.gallerySlides || []), { src: "", alt: "" }] })}
      >
        Add slider photo
      </button>

      <h3>Gallery page</h3>
      {(content.gallery || []).map((item, index) => (
        <article className="card" key={`${item.src}-${index}`}>
          <div className="row">
            <img className="preview" src={fileUrl(item.src)} alt="" />
            <div>
              <div className="field">
                <label>Alt</label>
                <input
                  value={item.alt || ""}
                  onChange={(event) =>
                    patch({
                      gallery: content.gallery.map((look, i) => (i === index ? { ...look, alt: event.target.value } : look)),
                    })
                  }
                />
              </div>
              <div className="actions">
                <FilePick
                  token={token}
                  folder="images"
                  accept="image/*"
                  label="Change photo"
                  onPath={(src) =>
                    patch({
                      gallery: content.gallery.map((look, i) => (i === index ? { ...look, src } : look)),
                    })
                  }
                />
                <button className="danger" type="button" onClick={() => patch({ gallery: content.gallery.filter((_, i) => i !== index) })}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
      <button className="ghost" type="button" onClick={() => patch({ gallery: [...(content.gallery || []), { src: "", alt: "" }] })}>
        Add gallery photo
      </button>
    </div>
  );
}

function BioEditor({ token, content, patch }) {
  const biography = content.biography || { intro: {}, timeline: [], awards: {} };
  return (
    <div>
      <article className="card">
        <img className="preview sq" src={fileUrl(biography.portrait)} alt="" />
        <div className="actions">
          <FilePick token={token} folder="images" accept="image/*" label="Change portrait" onPath={(portrait) => patch({ biography: { ...biography, portrait } })} />
        </div>
        <Pair label="Intro" value={biography.intro} onChange={(intro) => patch({ biography: { ...biography, intro } })} />
        <Pair label="Awards" value={biography.awards} onChange={(awards) => patch({ biography: { ...biography, awards } })} />
      </article>
      {(biography.timeline || []).map((item, index) => (
        <article className="card" key={index}>
          <div className="field">
            <label>Year</label>
            <input
              value={item.year || ""}
              onChange={(event) =>
                patch({
                  biography: {
                    ...biography,
                    timeline: biography.timeline.map((row, i) => (i === index ? { ...row, year: event.target.value } : row)),
                  },
                })
              }
            />
          </div>
          <Pair
            label="Title"
            value={item.title}
            onChange={(title) =>
              patch({
                biography: {
                  ...biography,
                  timeline: biography.timeline.map((row, i) => (i === index ? { ...row, title } : row)),
                },
              })
            }
          />
          <Pair
            label="Text"
            value={item.text}
            onChange={(text) =>
              patch({
                biography: {
                  ...biography,
                  timeline: biography.timeline.map((row, i) => (i === index ? { ...row, text } : row)),
                },
              })
            }
          />
        </article>
      ))}
    </div>
  );
}

function NewsEditor({ token, content, patch }) {
  const news = content.news || [];
  function update(index, next) {
    patch({ news: news.map((item, i) => (i === index ? { ...item, ...next } : item)) });
  }
  return (
    <div>
      {news.map((item, index) => (
        <article className="card" key={item.id}>
          <div className="row">
            <img className="preview wide" src={fileUrl(item.image)} alt="" />
            <div>
              <div className="field">
                <label>Date</label>
                <input value={item.date || ""} onChange={(event) => update(index, { date: event.target.value })} />
              </div>
              <Pair label="Title" value={item.title} onChange={(title) => update(index, { title })} />
              <PairArea label="Article" value={item.excerpt} onChange={(excerpt) => update(index, { excerpt })} />
              <p className="hint">This text opens when someone clicks the news on the site.</p>
              <div className="actions">
                <FilePick token={token} folder="images" accept="image/*" label="Change image" onPath={(image) => update(index, { image })} />
                <button className="danger" type="button" onClick={() => patch({ news: news.filter((_, i) => i !== index) })}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
      <button
        className="ghost"
        type="button"
        onClick={() =>
          patch({
            news: [
              ...news,
              { id: `n-${Date.now()}`, date: new Date().toISOString().slice(0, 10), image: "", title: { en: "New note", ar: "خبر جديد" }, excerpt: { en: "", ar: "" } },
            ],
          })
        }
      >
        Add news
      </button>
    </div>
  );
}

function TextsEditor({ content, patch }) {
  const copy = content.copy || {};
  function setCopy(next) {
    patch({ copy: { ...copy, ...next } });
  }
  return (
    <div className="card">
      <Pair label="Icon / mark" value={copy.mark} onChange={(mark) => setCopy({ mark })} />
      <Pair label="Tagline" value={copy.tagline} onChange={(tagline) => setCopy({ tagline })} />
      <Pair label="Listen button" value={copy.listen} onChange={(listen) => setCopy({ listen })} />
      <Pair label="Watch button" value={copy.watch} onChange={(watch) => setCopy({ watch })} />
      <Pair label="Open full page" value={copy.explore} onChange={(explore) => setCopy({ explore })} />
      <Pair label="Music title" value={copy.musicPage?.title} onChange={(title) => setCopy({ musicPage: { ...copy.musicPage, title } })} />
      <Pair label="Gallery title" value={copy.galleryPage?.title} onChange={(title) => setCopy({ galleryPage: { ...copy.galleryPage, title } })} />
      <Pair label="Videos title" value={copy.videosPage?.title} onChange={(title) => setCopy({ videosPage: { ...copy.videosPage, title } })} />
      <Pair label="Biography title" value={copy.bioPage?.title} onChange={(title) => setCopy({ bioPage: { ...copy.bioPage, title } })} />
      <Pair label="News title" value={copy.newsPage?.title} onChange={(title) => setCopy({ newsPage: { ...copy.newsPage, title } })} />
      <Pair label="Footer" value={copy.footer?.rights} onChange={(rights) => setCopy({ footer: { ...copy.footer, rights } })} />
      <p className="hint">Nav words: Home, Music, Gallery, Videos, Biography, News — change them below.</p>
      {Object.entries(copy.nav || {}).map(([key, value]) => (
        <Pair
          key={key}
          label={`Nav ${key}`}
          value={value}
          onChange={(next) => setCopy({ nav: { ...copy.nav, [key]: next } })}
        />
      ))}
    </div>
  );
}
