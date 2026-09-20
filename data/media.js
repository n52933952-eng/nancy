export function mediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_CDN_URL || "";
  if (base) return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  return `/${path.replace(/^\//, "")}`;
}

export const heroTone = {
  night: { ink: "#f7f0e4", accent: "#d4af37", bar: "dark" },
  teal: { ink: "#f4fff9", accent: "#2ec4b0", bar: "dark" },
  coffee: { ink: "#f7f0e4", accent: "#f0d48a", bar: "dark" },
  ivory: { ink: "#1c120c", accent: "#d4af37", bar: "light" },
  rouge: { ink: "#fff6f2", accent: "#ffb3b3", bar: "dark" },
  cream: { ink: "#1c120c", accent: "#8a5a20", bar: "light" },
  blue: { ink: "#f4f8ff", accent: "#8ec5ff", bar: "dark" },
  rose: { ink: "#fff4f7", accent: "#f0a3b4", bar: "dark" },
  tiffany: { ink: "#f3fffc", accent: "#5fd4c4", bar: "dark" },
  gold: { ink: "#fff8e6", accent: "#f0d48a", bar: "dark" },
};

export const slides = [
  {
    src: "/images/gallery-11.jpg",
    position: "center 12%",
    alt: "Nancy Ajram in a teal evening gown",
    caption: { en: "Emerald night", ar: "ليلة الزمرد" },
    theme: heroTone.teal,
  },
  {
    src: "/images/slide-coffee.jpg",
    position: "center 22%",
    alt: "Nancy Ajram with coffee",
    caption: { en: "Quiet glamour", ar: "أناقة هادئة" },
    theme: heroTone.coffee,
  },
  {
    src: "/images/slide-red.jpg",
    position: "center 18%",
    alt: "Nancy Ajram in white on red",
    caption: { en: "Red velvet", ar: "أحمر المخمل" },
    theme: heroTone.rouge,
  },
  {
    src: "/images/slide-lounge.jpg",
    position: "center 22%",
    alt: "Nancy Ajram in a cream sweater",
    caption: { en: "Soft light", ar: "ضوء ناعم" },
    theme: heroTone.night,
  },
  {
    src: "/images/slide-blue-glam.jpg",
    position: "center 18%",
    alt: "Nancy Ajram on a blue backdrop",
    caption: { en: "Night blue", ar: "أزرق الليل" },
    theme: heroTone.blue,
  },
  {
    src: "/images/slide-flowers.jpg",
    position: "center 18%",
    alt: "Nancy Ajram in a black dress with flowers",
    caption: { en: "Evening roses", ar: "ورود المساء" },
    theme: heroTone.rose,
  },
  {
    src: "/images/slide-tiffany-blue.jpg",
    position: "center 16%",
    alt: "Nancy Ajram in a diamond necklace",
    caption: { en: "Tiffany night", ar: "ليلة تيفاني" },
    theme: heroTone.tiffany,
  },
  {
    src: "/images/slide-tiffany-gold.webp",
    position: "center 18%",
    alt: "Nancy Ajram at a Tiffany event",
    caption: { en: "Gold letters", ar: "حروف ذهبية" },
    theme: heroTone.gold,
  },
  {
    src: "/images/slide-fur.jpg",
    position: "center 18%",
    alt: "Nancy Ajram portrait",
    caption: { en: "The icon", ar: "الأيقونة" },
    theme: heroTone.night,
  },
  {
    src: "/images/slide-street.jpg",
    position: "center 22%",
    alt: "Nancy Ajram in a white dress",
    caption: { en: "Lebanon light", ar: "نور لبنان" },
    theme: heroTone.night,
  },
  {
    src: "/images/slide-box.jpg",
    position: "center 20%",
    alt: "Nancy Ajram with a jewelry box",
    caption: { en: "A quiet sparkle", ar: "بريق هادئ" },
    theme: heroTone.gold,
  },
  {
    src: "/images/slide-jewels.jpg",
    position: "center 18%",
    alt: "Nancy Ajram in jewels",
    caption: { en: "Diamonds", ar: "ألماس" },
    theme: heroTone.night,
  },
  {
    src: "/images/slide-gala.webp",
    position: "center 16%",
    alt: "Nancy Ajram at a gala",
    caption: { en: "On stage & beyond", ar: "على المسرح وخارجه" },
    theme: heroTone.gold,
  },
  {
    src: "/images/slide-closeup.jpg",
    position: "center center",
    alt: "Nancy Ajram close-up",
    caption: { en: "A voice of a generation", ar: "صوت جيل" },
    theme: heroTone.night,
  },
];

export const homeTheme = {
  title: { en: "Nancy Ajram", ar: "نانسي عجرم" },
  file: "/audio/home-theme.mp3",
};

export const albums = [
  {
    id: "ah-w-noss",
    title: { en: "Ah W Noss", ar: "آه ونص" },
    year: 2004,
    cover: "/images/album-ah-w-noss.jpg",
    coverPosition: "center 48%",
    coverScale: 1.24,
    tracks: [
      { id: "ah-w-noss", title: { en: "Ah W Noss", ar: "آه ونص" }, file: "audio/ah-w-noss/ah-w-noss.mp3" },
      { id: "hobak-liya", title: { en: "Hobak Liya", ar: "حبك ليا" }, file: "audio/ah-w-noss/hobak-liya.mp3", cover: "/images/track-hobak-liya.jpg" },
      { id: "oul-tani-keda", title: { en: "Oul Tani Keda", ar: "قل تاني كده" }, file: "audio/ah-w-noss/oul-tani-keda.mp3", cover: "/images/track-oul-tani-keda.jpg" },
      { id: "sana-wara-sana", title: { en: "Sana Wara Sana", ar: "سنة ورا سنة" }, file: "audio/ah-w-noss/sana-wara-sana.mp3", cover: "/images/track-sana-wara-sana.jpg" },
      { id: "taala-yah", title: { en: "Ta'ala Yah", ar: "تعالى ياه" }, file: "audio/ah-w-noss/taala-yah.mp3", cover: "/images/track-taala-yah.jpg" },
      { id: "enta-eih", title: { en: "Enta Eih", ar: "إنت إيه" }, file: "audio/ah-w-noss/enta-eih.mp3", cover: "/images/track-enta-eih.jpg" },
      { id: "lawn-ouyounak", title: { en: "Lawn Ouyounak", ar: "لون عيونك" }, file: "audio/ah-w-noss/lawn-ouyounak.mp3", cover: "/images/track-lawn-ouyounak.jpg" },
    ],
  },
  {
    id: "ya-tabtab",
    title: { en: "Ya Tabtab... Wa Dallaa", ar: "يا طبطب ودلع" },
    year: 2006,
    cover: "/images/album-ya-tabtab.jpg",
    coverPosition: "center 22%",
    tracks: [
      { id: "ya-tabtab", title: { en: "Ya Tabtab", ar: "يا طبطب" }, file: "audio/ya-tabtab/ya-tabtab.mp3" },
      { id: "moegaba", title: { en: "Moegaba", ar: "معجبة" }, file: "audio/ya-tabtab/moegaba.mp3", cover: "/images/track-moegaba.jpg" },
      { id: "ana-yalli-bhebak", title: { en: "Ana Yalli Bhebak", ar: "أنا ياللي بحبك" }, file: "audio/ya-tabtab/ana-yalli-bhebak.mp3", cover: "/images/track-ana-yalli-bhebak.jpg" },
      { id: "ashtaki-menno", title: { en: "Ashtaki Menno", ar: "أشتكي منه" }, file: "audio/ya-tabtab/ashtaki-menno.mp3", cover: "/images/track-ashtaki-menno.jpg" },
      { id: "ehsas-jdeed", title: { en: "Ehsas Jdeed", ar: "إحساس جديد" }, file: "audio/ya-tabtab/ehsas-jdeed.mp3", cover: "/images/track-ehsas-jdeed.jpg" },
      { id: "meshtaqa-leek", title: { en: "Meshtaqa Leek", ar: "مشتاقة ليك" }, file: "audio/ya-tabtab/meshtaqa-leek.mp3", cover: "/images/track-meshtaqa-leek.jpg" },
      { id: "elli-kan", title: { en: "Elli Kan", ar: "اللي كان" }, file: "audio/ya-tabtab/elli-kan.mp3", cover: "/images/track-elli-kan.jpg" },
      { id: "ya-sayed-el-sayed", title: { en: "Ya Sayed El Sayed", ar: "يا سي السيد" }, file: "audio/ya-tabtab/ya-sayed-el-sayed.mp3", cover: "/images/track-ya-sayed-el-sayed.jpg" },
      { id: "law-dallouni", title: { en: "Law Dallouni", ar: "لو دللوني" }, file: "audio/ya-tabtab/law-dallouni.mp3", cover: "/images/track-law-dallouni.jpg" },
    ],
  },
  {
    id: "betfakkar",
    title: { en: "Betfakkar Fi Eih", ar: "بتفكر في إيه" },
    year: 2008,
    cover: "/images/album-betfakkar-mic.jpg",
    coverPosition: "center 46%",
    coverScale: 1.22,
    tracks: [
      { id: "betfakkar-fi-eih", title: { en: "Betfakkar Fi Eih", ar: "بتفكر في إيه" }, file: "audio/betfakkar/betfakkar-fi-eih.mp3" },
      { id: "ibn-el-jiran", title: { en: "Ibn El Jiran", ar: "ابن الجيران" }, file: "audio/betfakkar/ibn-el-jiran.mp3", cover: "/images/track-ibn-el-jiran.jpg" },
      { id: "lamset-eid", title: { en: "Lamset Eid", ar: "لمسة إيد" }, file: "audio/betfakkar/lamset-eid.mp3", cover: "/images/track-lamset-eid.jpg" },
      { id: "meen-da-elli-nesik", title: { en: "Meen Da Elli Nesik", ar: "مين دا اللي نسيك" }, file: "audio/betfakkar/meen-da-elli-nesik.mp3", cover: "/images/track-meen-da-elli-nesik.jpg" },
      { id: "mashi-haddi", title: { en: "Mashi Haddi", ar: "ماشي حدي" }, file: "audio/betfakkar/mashi-haddi.mp3", cover: "/images/track-mashi-haddi.jpg" },
      { id: "wana-bein-edeik", title: { en: "Wana Bein Edeik", ar: "وأنا بين إيديك" }, file: "audio/betfakkar/wana-bein-edeik.mp3" },
    ],
  },
  {
    id: "nancy-7",
    title: { en: "OK", ar: "أوكي" },
    year: 2010,
    cover: "/images/album-ok.jpg",
    coverPosition: "center 18%",
    tracks: [
      { id: "fi-hagat", title: { en: "Fi Hagat", ar: "في حاجات" }, file: "audio/nancy-7/fi-hagat.mp3", cover: "/images/track-fi-hagat.webp" },
      { id: "sheikh-el-shabab", title: { en: "Sheikh El Shabab", ar: "شيخ الشباب" }, file: "audio/nancy-7/sheikh-el-shabab.mp3", cover: "/images/track-sheikh-el-shabab.jpg" },
      { id: "ya-kather", title: { en: "Ya Kather", ar: "يا كثر" }, file: "audio/nancy-7/ya-kather.mp3", cover: "/images/track-ya-kather.jpg" },
      { id: "eih-akhbar-nafseeto", title: { en: "Eih Akhbar Nafseeto", ar: "إيه أخبار نفسيتو" }, file: "audio/nancy-7/eih-akhbar-nafseeto.mp3", cover: "/images/track-eih-akhbar-nafseeto.jpg" },
      { id: "eini-aleik", title: { en: "Eini Aleik", ar: "عيني عليك" }, file: "audio/nancy-7/eini-aleik.mp3", cover: "/images/track-eini-aleik.jpg" },
      { id: "ok", title: { en: "OK", ar: "أوكي" }, file: "audio/nancy-7/ok.mp3" },
    ],
  },
  {
    id: "nancy-8",
    title: { en: "Nancy 8", ar: "نانسي ٨" },
    year: 2014,
    cover: "/images/album-nancy-8.jpg",
    coverPosition: "center 16%",
    tracks: [
      { id: "ma-tegi-hena", title: { en: "Ma Tegi Hena", ar: "ما تيجي هنا" }, file: "audio/nancy-8/ma-tegi-hena.mp3", cover: "/images/track-ma-tegi-hena.jpg" },
      { id: "mouch-fara-ktir", title: { en: "Mouch Fara Ktir", ar: "مش فارقة كتير" }, file: "audio/nancy-8/mouch-fara-ktir.mp3", cover: "/images/track-mouch-fara-ktir.jpg" },
      { id: "men-el-yawm", title: { en: "Men El Yawm", ar: "من اليوم" }, file: "audio/nancy-8/men-el-yawm.mp3", cover: "/images/track-men-el-yawm.jpg" },
      { id: "yalla", title: { en: "Yalla", ar: "يلا" }, file: "audio/nancy-8/yalla.mp3", cover: "/images/track-yalla.jpg" },
      { id: "tisabeg-el-rih", title: { en: "Tisabeg El Rih", ar: "تسابق الريح" }, file: "audio/nancy-8/tisabeg-el-rih.mp3", cover: "/images/track-tisabeg-el-rih.jpg" },
      { id: "rahent-aleik", title: { en: "Rahent Aleik", ar: "راهنت عليك" }, file: "audio/nancy-8/rahent-aleik.mp3", cover: "/images/track-rahent-aleik.jpg" },
      { id: "shou-hal-ossa", title: { en: "Shou Hal Ossa", ar: "شو هالقصة" }, file: "audio/nancy-8/shou-hal-ossa.mp3", cover: "/images/track-shou-hal-ossa.jpg" },
      { id: "nam-bi-albi", title: { en: "Nam Bi Albi", ar: "نام بقلبي" }, file: "audio/nancy-8/nam-bi-albi.mp3", cover: "/images/track-nam-bi-albi.jpg" },
      { id: "etnen-souhab", title: { en: "Etnen Souhab", ar: "اتنين صحاب" }, file: "audio/nancy-8/etnen-souhab.mp3", cover: "/images/track-etnen-souhab.jpg" },
      { id: "ma-awedak-ma-ghir", title: { en: "Ma Aw'edak Ma Ghir", ar: "ما أوعدك ما غير" }, file: "audio/nancy-8/ma-awedak-ma-ghir.mp3", cover: "/images/track-ma-awedak-ma-ghir.jpg" },
    ],
  },
  {
    id: "nancy-9",
    title: { en: "Nancy 9", ar: "نانسي ٩" },
    year: 2017,
    cover: "/images/album-nancy-9-wind.jpg",
    coverPosition: "center 32%",
    tracks: [
      { id: "hassa-beek", title: { en: "Hassa Beek", ar: "حاسة بيك" }, file: "audio/nancy-9/hassa-beek.mp3", cover: "/images/track-hassa-beek.jpg" },
      { id: "helm-el-banat", title: { en: "Helm El Banat", ar: "حلم البنات" }, file: "audio/nancy-9/helm-el-banat.mp3", cover: "/images/track-helm-el-banat.jpg" },
      { id: "khamsa-farasha", title: { en: "Khamsa Far'asha", ar: "خمسة فرقشة" }, file: "audio/nancy-9/khamsa-farasha.mp3", cover: "/images/track-khamsa-farasha.jpg" },
      { id: "albi-byesal-eini", title: { en: "Albi Byes'al Eini", ar: "قلبي بيسأل عيني" }, file: "audio/nancy-9/albi-byesal-eini.mp3", cover: "/images/track-albi-byesal-eini.jpg" },
      { id: "kharab-beyout", title: { en: "Kharab Beyout", ar: "خراب بيوت" }, file: "audio/nancy-9/kharab-beyout.mp3", cover: "/images/track-kharab-beyout.jpg" },
      { id: "el-hob-zay-el-watar", title: { en: "El Hob Zay El Watar", ar: "الحب زي الوتر" }, file: "audio/nancy-9/el-hob-zay-el-watar.mp3", cover: "/images/track-el-hob-zay-el-watar.jpg" },
      { id: "keifak-bel-hob", title: { en: "Keifak Bel Hob", ar: "كيفك بالحب" }, file: "audio/nancy-9/keifak-bel-hob.mp3", cover: "/images/track-keifak-bel-hob.webp" },
      { id: "maak", title: { en: "Ma'ak", ar: "معاك" }, file: "audio/nancy-9/maak.mp3", cover: "/images/track-maak.jpg" },
    ],
  },
  {
    id: "nancy-10",
    title: { en: "Nancy 10", ar: "نانسي ١٠" },
    year: 2021,
    cover: "/images/album-nancy-10.webp",
    coverPosition: "center 18%",
    tracks: [
      { id: "salamat", title: { en: "Salamat", ar: "سلامات" }, file: "audio/nancy-10/salamat.mp3", cover: "/images/track-salamat.jpg" },
      { id: "badde-hada-hebbou", title: { en: "Badde Hada Hebbou", ar: "بدي حدا حبو" }, file: "audio/nancy-10/badde-hada-hebbou.mp3", cover: "/images/track-badde-hada-hebbou.jpg" },
      { id: "hobak-yeqawwini", title: { en: "Hobak Yeqawwini", ar: "حبك يقويني" }, file: "audio/nancy-10/hobak-yeqawwini.mp3", cover: "/images/track-hobak-yeqawwini.jpg" },
      { id: "moshkeltak-el-waheede", title: { en: "Moshkeltak El Waheede", ar: "مشكلتك الوحيدة" }, file: "audio/nancy-10/moshkeltak-el-waheede.mp3", cover: "/images/track-moshkeltak-el-waheede.jpg" },
      { id: "jayeh-maak", title: { en: "Jayeh Maak", ar: "جاية معاك" }, file: "audio/nancy-10/jayeh-maak.mp3", cover: "/images/track-jayeh-maak.jpg" },
      { id: "ma-teetazer", title: { en: "Ma Te'tazer", ar: "ما تعتذر" }, file: "audio/nancy-10/ma-teetazer.mp3", cover: "/images/track-ma-teetazer.jpg" },
    ],
  },
];

export const videos = [
  {
    id: "clip-1",
    title: { en: "Official clip 1", ar: "كليب ١" },
    poster: "/images/slide-street.jpg",
    file: "video/clip-1.mp4",
    year: 2024,
  },
  {
    id: "clip-2",
    title: { en: "Official clip 2", ar: "كليب ٢" },
    poster: "/images/slide-jewels.jpg",
    file: "video/clip-2.mp4",
    year: 2023,
  },
  {
    id: "clip-3",
    title: { en: "Official clip 3", ar: "كليب ٣" },
    poster: "/images/slide-gala.webp",
    file: "video/clip-3.mp4",
    year: 2017,
  },
];

export const gallerySlides = [
  { src: "/images/gallery-03.jpg", alt: "Nancy Ajram smiling in a black dress" },
  { src: "/images/gallery-01.jpg", alt: "Nancy Ajram in a white jacket and gold chain" },
  { src: "/images/gallery-02.jpg", alt: "Nancy Ajram in a white herringbone suit" },
  { src: "/images/gallery-04.jpg", alt: "Nancy Ajram in a green gold-trim dress" },
  { src: "/images/gallery-05.jpg", alt: "Nancy Ajram portrait" },
  { src: "/images/gallery-06.jpg", alt: "Nancy Ajram with a microphone" },
  { src: "/images/gallery-07.jpg", alt: "Nancy Ajram in a navy sequin dress" },
  { src: "/images/gallery-08.jpg", alt: "Nancy Ajram casual selfie" },
  { src: "/images/gallery-09.jpg", alt: "Nancy Ajram on stage with open arms" },
  { src: "/images/gallery-10.jpg", alt: "Nancy Ajram in a teal sequin dress" },
  { src: "/images/gallery-11.jpg", alt: "Nancy Ajram in a teal evening gown" },
  { src: "/images/gallery-12.jpg", alt: "Nancy Ajram in a striped sequin dress" },
  { src: "/images/gallery-13.jpg", alt: "Nancy Ajram in a green sequin gown" },
];

export const gallery = [
  { src: "/images/look-25.jpg", size: "hero", alt: "Nancy Ajram in a white dress by the water", objectPosition: "center 16%" },
  { src: "/images/look-02.webp", alt: "Nancy Ajram in a tweed mini dress", objectPosition: "center 8%" },
  { src: "/images/look-15.jpg", alt: "Nancy Ajram laughing in blue light", objectPosition: "center 22%" },
  { src: "/images/look-01.webp", alt: "Nancy Ajram in a silver beaded set" },
  { src: "/images/look-04.webp", size: "wide", alt: "Nancy Ajram in a white dress by the sea" },
  { src: "/images/look-05.jpg", alt: "Nancy Ajram in a black velvet look" },
  { src: "/images/look-06.jpg", alt: "Nancy Ajram taking a selfie" },
  { src: "/images/look-07.webp", alt: "Nancy Ajram in a gold tweed jacket" },
  { src: "/images/look-08.webp", alt: "Nancy Ajram in silver lace" },
  { src: "/images/look-09.webp", alt: "Nancy Ajram in a pink sequin top" },
  { src: "/images/look-10.webp", size: "wide", alt: "Nancy Ajram on stage in the spotlight" },
  { src: "/images/look-11.webp", size: "tall", alt: "Nancy Ajram in a pink mermaid gown" },
  { src: "/images/look-12.webp", alt: "Nancy Ajram in a crystal dress at night" },
  { src: "/images/look-13.webp", alt: "Nancy Ajram smiling in burgundy" },
  { src: "/images/look-14.webp", alt: "Nancy Ajram in a burgundy dress" },
  { src: "/images/look-03.webp", alt: "Nancy Ajram in a mauve dress" },
  { src: "/images/look-16.webp", alt: "Nancy Ajram with wind in her hair" },
  { src: "/images/look-17.webp", size: "wide", alt: "Nancy Ajram in a white cape dress" },
  { src: "/images/look-18.webp", alt: "Nancy Ajram in a gold beaded dress" },
  { src: "/images/look-19.jpg", alt: "Nancy Ajram in a black sequin top", objectPosition: "center 12%" },
  { src: "/images/look-20.webp", size: "tall", alt: "Nancy Ajram on stage in a gold mini dress", objectPosition: "center 28%" },
  { src: "/images/look-21.webp", alt: "Nancy Ajram singing in a red dress", objectPosition: "center 16%" },
  { src: "/images/look-22.jpg", alt: "Nancy Ajram in a black interview look", objectPosition: "center 14%" },
  { src: "/images/look-23.jpg", alt: "Nancy Ajram in a red sequin dress", objectPosition: "center 12%" },
  { src: "/images/look-24.webp", alt: "Nancy Ajram in a red one-shoulder dress", objectPosition: "center 14%" },
  { src: "/images/look-26.jpg", alt: "Nancy Ajram in a white dress among flowers", objectPosition: "62% 32%" },
];

export const news = [
  {
    id: "n1",
    date: "2024-08-12",
    image: "/images/slide-street.jpg",
    title: {
      en: "Nancy Ajram lights up a new summer look",
      ar: "نانسي عجرم بإطلالة صيفية جديدة",
    },
    excerpt: {
      en: "A fan-site highlight of her latest photos — elegance, movement, and that signature smile.",
      ar: "محطة من أحدث صورها: أناقة وحركة وابتسامتها المميزة.",
    },
  },
  {
    id: "n2",
    date: "2024-05-16",
    image: "/images/slide-fur.jpg",
    title: {
      en: "Happy birthday to Nancy Ajram",
      ar: "عيد ميلاد نانسي عجرم",
    },
    excerpt: {
      en: "Born 16 May 1983 in Beirut — a voice that still defines Arab pop.",
      ar: "وُلدت في 16 أيار 1983 في بيروت — صوت ما زال يرسم البوب العربي.",
    },
  },
  {
    id: "n3",
    date: "2023-11-02",
    image: "/images/slide-gala.webp",
    title: {
      en: "A career of stages and firsts",
      ar: "مسيرة منصات وبدايات",
    },
    excerpt: {
      en: "From Lebanese television to world tours — Nancy remains one of the most searched Arab artists.",
      ar: "من التلفزيون اللبناني إلى الجولات العالمية — نانسي من أكثر الفنانات بحثاً.",
    },
  },
];

export const biography = {
  portrait: "/images/bio-portrait.jpg",
  intro: {
    en: "Nancy Nabil Ajram is a Lebanese singer, one of the most famous voices in Arab pop. Born in Beirut on 16 May 1983, she grew from a child performer into a regional superstar — known for hit albums, sold-out shows, and a style that mixes glamour with warmth.",
    ar: "نانسي نبيل عجرم مغنية لبنانية، ومن أشهر أصوات البوب العربي. وُلدت في بيروت في 16 أيار 1983، وانتقلت من طفلة على المسرح إلى نجمة كبيرة في المنطقة — بألبومات ناجحة وحفلات مكتملة وأناقة تمزج الفخامة بالدفء.",
  },
  timeline: [
    {
      year: "1983",
      title: { en: "Born in Beirut", ar: "الولادة في بيروت" },
      text: {
        en: "Nancy Nabil Ajram is born in Achrafieh, Beirut, Lebanon.",
        ar: "وُلدت نانسي نبيل عجرم في الأشرفية، بيروت، لبنان.",
      },
    },
    {
      year: "1990s",
      title: { en: "A child on television", ar: "طفلة على الشاشة" },
      text: {
        en: "She appears on Lebanese talent shows and starts recording while still very young.",
        ar: "تظهر في برامج المواهب اللبنانية وتبدأ التسجيل وهي صغيرة.",
      },
    },
    {
      year: "2003–2004",
      title: { en: "Ah W Noss", ar: "آه ونص" },
      text: {
        en: "The album and title track turn her into a pan-Arab pop phenomenon.",
        ar: "الألبوم وأغنيته الأساسية يجعلانها ظاهرة بوب عربية.",
      },
    },
    {
      year: "2008",
      title: { en: "UNICEF ambassador", ar: "سفيرة اليونيسف" },
      text: {
        en: "She becomes a UNICEF Goodwill Ambassador for the Middle East and North Africa, speaking for children.",
        ar: "تصبح سفيرة للنوايا الحسنة لدى اليونيسف في الشرق الأوسط وشمال أفريقيا، صوتاً للأطفال.",
      },
    },
    {
      year: "2010s",
      title: { en: "The Voice & world stages", ar: "ذا فويس والمنصات العالمية" },
      text: {
        en: "She coaches on The Voice Ahla Sawt and keeps releasing chart albums while touring the world.",
        ar: "تشارك كمدربة في The Voice أحلى صوت وتواصل إصدار الألبومات والجولات.",
      },
    },
    {
      year: "Today",
      title: { en: "Still the name", ar: "ما زال الاسم" },
      text: {
        en: "Nancy Ajram remains one of the most beloved and searched Lebanese artists in the world.",
        ar: "تبقى نانسي عجرم من أحب وأكثر الفنانات اللبنانيات بحثاً في العالم.",
      },
    },
  ],
  awards: {
    en: "Multiple World Music Awards, Murex d’Or honors, and a place among the best-selling Arabic-language artists of her generation.",
    ar: "جوائز عالمية متعددة، تكريمات الموريكس دور، ومكان بين أكثر الفنانين مبيعاً باللغة العربية في جيلها.",
  },
};
