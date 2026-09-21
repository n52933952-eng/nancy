import { heroTone } from "./heroTone";

export { heroTone };

export function mediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_CDN_URL || "";
  if (base) return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  return `/${path.replace(/^\//, "")}`;
}

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
      { id: "ah-w-noss", title: { en: "Ah W Noss", ar: "آه ونص" }, youtube: "t_L2nc1MAIU" },
      { id: "oul-tani-keda", title: { en: "Oul Tani Keda", ar: "قل تاني كده" }, youtube: "3ObVN3QQiZ8", cover: "/images/track-oul-tani-keda.jpg" },
      { id: "enta-eih", title: { en: "Enta Eih", ar: "إنت إيه" }, youtube: "eql0whxoK_M", cover: "/images/track-enta-eih.jpg" },
      { id: "lawn-ouyounak", title: { en: "Lawn Ouyounak", ar: "لون عيونك" }, youtube: "jEGnvYKH18A", cover: "/images/track-lawn-ouyounak.jpg" },
    ],
  },
  {
    id: "ya-tabtab",
    title: { en: "Ya Tabtab... Wa Dallaa", ar: "يا طبطب ودلع" },
    year: 2006,
    cover: "/images/album-ya-tabtab.jpg",
    coverPosition: "center 22%",
    tracks: [
      { id: "ya-tabtab", title: { en: "Ya Tabtab", ar: "يا طبطب" }, youtube: "6fCBSQjpH8U" },
      { id: "moegaba", title: { en: "Moegaba", ar: "معجبة" }, youtube: "dDNMNF2KrYM", cover: "/images/track-moegaba.jpg" },
      { id: "ana-yalli-bhebak", title: { en: "Ana Yalli Bhebak", ar: "أنا ياللي بحبك" }, youtube: "D_hH-bn5dD0", cover: "/images/track-ana-yalli-bhebak.jpg" },
      { id: "ehsas-jdeed", title: { en: "Ehsas Jdeed", ar: "إحساس جديد" }, youtube: "YRadUqAv7i8", cover: "/images/track-ehsas-jdeed.jpg" },
      { id: "meshtaqa-leek", title: { en: "Meshtaqa Leek", ar: "مشتاقة ليك" }, youtube: "IqdyirMu84Y", cover: "/images/track-meshtaqa-leek.jpg" },
      { id: "elli-kan", title: { en: "Elli Kan", ar: "اللي كان" }, youtube: "c8hVPjZLJlA", cover: "/images/track-elli-kan.jpg" },
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
      { id: "betfakkar-fi-eih", title: { en: "Betfakkar Fi Eih", ar: "بتفكر في إيه" }, youtube: "ef0nQ_BvAwg" },
      { id: "ibn-el-jiran", title: { en: "Ibn El Jiran", ar: "ابن الجيران" }, youtube: "cnxrq_ZOcoY", cover: "/images/track-ibn-el-jiran.jpg" },
      { id: "lamset-eid", title: { en: "Lamset Eid", ar: "لمسة إيد" }, youtube: "eIoFyl6AkkQ", cover: "/images/track-lamset-eid.jpg" },
      { id: "meen-da-elli-nesik", title: { en: "Meen Da Elli Nesik", ar: "مين دا اللي نسيك" }, youtube: "sG33uGCO_eE", cover: "/images/track-meen-da-elli-nesik.jpg" },
      { id: "mashi-haddi", title: { en: "Mashi Haddi", ar: "ماشي حدي" }, youtube: "dGxtAViYVnU", cover: "/images/track-mashi-haddi.jpg" },
    ],
  },
  {
    id: "nancy-7",
    title: { en: "Ya Kather", ar: "يا كثر" },
    year: 2010,
    cover: "/images/album-ok.jpg",
    coverPosition: "center 18%",
    tracks: [
      { id: "fi-hagat", title: { en: "Fi Hagat", ar: "في حاجات" }, youtube: "ozmj375CR3k", cover: "/images/track-fi-hagat.webp" },
      { id: "sheikh-el-shabab", title: { en: "Sheikh El Shabab", ar: "شيخ الشباب" }, youtube: "vZ0OFwpvIv0", cover: "/images/track-sheikh-el-shabab.jpg" },
      { id: "ya-kather", title: { en: "Ya Kather", ar: "يا كثر" }, youtube: "jcO2JJ61eHU", cover: "/images/track-ya-kather.jpg" },
    ],
  },
  {
    id: "nancy-8",
    title: { en: "Nancy 8", ar: "نانسي ٨" },
    year: 2014,
    cover: "/images/album-nancy-8.jpg",
    coverPosition: "center 16%",
    tracks: [
      { id: "ma-tegi-hena", title: { en: "Ma Tegi Hena", ar: "ما تيجي هنا" }, youtube: "UBBxGHvjNFM", cover: "/images/track-ma-tegi-hena.jpg" },
      { id: "mouch-fara-ktir", title: { en: "Mouch Fara Ktir", ar: "مش فارقة كتير" }, youtube: "87Qtdh-jLi8", cover: "/images/track-mouch-fara-ktir.jpg" },
      { id: "yalla", title: { en: "Yalla", ar: "يلا" }, youtube: "jHEYg6VZoOw", cover: "/images/track-yalla.jpg" },
      { id: "ma-awedak-ma-ghir", title: { en: "Ma Aw'edak Ma Ghir", ar: "ما أوعدك ما غير" }, youtube: "I9_jgbJ3XA0", cover: "/images/track-ma-awedak-ma-ghir.jpg" },
    ],
  },
  {
    id: "nancy-9",
    title: { en: "Nancy 9", ar: "نانسي ٩" },
    year: 2017,
    cover: "/images/album-nancy-9-wind.jpg",
    coverPosition: "center 32%",
    tracks: [
      { id: "hassa-beek", title: { en: "Hassa Beek", ar: "حاسة بيك" }, youtube: "bghEyqhcWzA", cover: "/images/track-hassa-beek.jpg" },
      { id: "el-hob-zay-el-watar", title: { en: "El Hob Zay El Watar", ar: "الحب زي الوتر" }, youtube: "_7NB1u-_Voc", cover: "/images/track-el-hob-zay-el-watar.jpg" },
      { id: "maak", title: { en: "Ma'ak", ar: "معاك" }, youtube: "bytVUsDTqFI", cover: "/images/track-maak.jpg" },
    ],
  },
  {
    id: "nancy-10",
    title: { en: "Nancy 10", ar: "نانسي ١٠" },
    year: 2021,
    cover: "/images/album-nancy-10.webp",
    coverPosition: "center 18%",
    tracks: [
      { id: "salamat", title: { en: "Salamat", ar: "سلامات" }, youtube: "tvoh0j1tdbc", cover: "/images/track-salamat.jpg" },
      { id: "badde-hada-hebbou", title: { en: "Badde Hada Hebbou", ar: "بدي حدا حبو" }, youtube: "_G0uT9qk_NY", cover: "/images/track-badde-hada-hebbou.jpg" },
      { id: "ma-teetazer", title: { en: "Ma Te'tazer", ar: "ما تعتذر" }, youtube: "VllbR3q3v1U", cover: "/images/track-ma-teetazer.jpg" },
    ],
  },
];

export const videos = [
  {
    id: "clip-1",
    title: { en: "Shhadi Ya Deni", ar: "اشهدي يا دني" },
    poster: "/images/slide-street.jpg",
    youtube: "WxOArstktZ4",
    year: 2026,
  },
  {
    id: "clip-2",
    title: { en: "Aala Shanak", ar: "على شانك" },
    poster: "/images/slide-jewels.jpg",
    youtube: "F7K5xF7pt9k",
    year: 2022,
  },
  {
    id: "clip-3",
    title: { en: "Tegy Nenbeset", ar: "حبيبي تجي ننبسط" },
    poster: "/images/slide-gala.webp",
    youtube: "O-QgbPczoqM",
    year: 2023,
  },
  {
    id: "clip-baddi-hada",
    title: { en: "Baddi Hada Hebbou", ar: "بدي حدا حبو" },
    youtube: "_G0uT9qk_NY",
    year: 2023,
  },
  {
    id: "clip-hassa-beek",
    title: { en: "Hassa Beek", ar: "حاسة بيك" },
    youtube: "bghEyqhcWzA",
    year: 2017,
  },
  {
    id: "clip-men-nazra",
    title: { en: "Men Nazra", ar: "من نظرة" },
    poster: "/images/slide-street.jpg",
    youtube: "UFn1-pTQ85s",
    year: 2024,
  },
  {
    id: "clip-aamel-aekla",
    title: { en: "Aamel Aekla", ar: "عامل عقلة" },
    youtube: "6mWD96Rx5Ds",
    year: 2013,
  },
  {
    id: "clip-ya-tabtab",
    title: { en: "Ya Tabtab", ar: "يا طبطب" },
    poster: "/images/album-ya-tabtab.jpg",
    youtube: "6fCBSQjpH8U",
    year: 2006,
  },
  {
    id: "clip-ebn-el-geran",
    title: { en: "Ebn El Geran", ar: "ابن الجيران" },
    poster: "/images/track-ibn-el-jiran.jpg",
    youtube: "cnxrq_ZOcoY",
    year: 2008,
  },
  {
    id: "clip-ana-yalli",
    title: { en: "Ana Yalli Bhebak", ar: "أنا ياللي بحبك" },
    poster: "/images/track-ana-yalli-bhebak.jpg",
    youtube: "D_hH-bn5dD0",
    year: 2006,
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
