export function mediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_CDN_URL || "";
  if (base) return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  return `/${path.replace(/^\//, "")}`;
}

export const slides = [
  {
    src: "/images/slide-coffee.jpg",
    position: "center 22%",
    alt: "Nancy Ajram with coffee",
    caption: { en: "Quiet glamour", ar: "أناقة هادئة" },
  },
  {
    src: "/images/slide-red.jpg",
    position: "center 18%",
    alt: "Nancy Ajram in white on red",
    caption: { en: "Red velvet", ar: "أحمر المخمل" },
  },
  {
    src: "/images/slide-blue-glam.jpg",
    position: "center 18%",
    alt: "Nancy Ajram on a blue backdrop",
    caption: { en: "Night blue", ar: "أزرق الليل" },
  },
  {
    src: "/images/slide-flowers.jpg",
    position: "center 18%",
    alt: "Nancy Ajram in a black dress with flowers",
    caption: { en: "Evening roses", ar: "ورود المساء" },
  },
  {
    src: "/images/slide-tiffany-blue.jpg",
    position: "center 16%",
    alt: "Nancy Ajram in a diamond necklace",
    caption: { en: "Tiffany night", ar: "ليلة تيفاني" },
  },
  {
    src: "/images/slide-tiffany-gold.webp",
    position: "center 18%",
    alt: "Nancy Ajram at a Tiffany event",
    caption: { en: "Gold letters", ar: "حروف ذهبية" },
  },
  {
    src: "/images/slide-fur.jpg",
    position: "center 18%",
    alt: "Nancy Ajram portrait",
    caption: { en: "The icon", ar: "الأيقونة" },
  },
  {
    src: "/images/slide-street.jpg",
    position: "center 22%",
    alt: "Nancy Ajram in a white dress",
    caption: { en: "Lebanon light", ar: "نور لبنان" },
  },
  {
    src: "/images/slide-box.jpg",
    position: "center 20%",
    alt: "Nancy Ajram with a jewelry box",
    caption: { en: "A quiet sparkle", ar: "بريق هادئ" },
  },
  {
    src: "/images/slide-jewels.jpg",
    position: "center 18%",
    alt: "Nancy Ajram in jewels",
    caption: { en: "Diamonds", ar: "ألماس" },
  },
  {
    src: "/images/slide-gala.webp",
    position: "center 16%",
    alt: "Nancy Ajram at a gala",
    caption: { en: "On stage & beyond", ar: "على المسرح وخارجه" },
  },
  {
    src: "/images/slide-closeup.jpg",
    position: "center center",
    alt: "Nancy Ajram close-up",
    caption: { en: "A voice of a generation", ar: "صوت جيل" },
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
    cover: "/images/slide-street.jpg",
    tracks: [
      { id: "ma-tegi-hena", title: { en: "Ma Tegi Hena", ar: "ما تيجي هنا" }, file: "audio/nancy-8/ma-tegi-hena.mp3" },
      { id: "mawhoum", title: { en: "Mawhoum", ar: "موهم" }, file: "audio/nancy-8/mawhoum.mp3" },
    ],
  },
  {
    id: "nancy-9",
    title: { en: "Nancy 9", ar: "نانسي ٩" },
    year: 2017,
    cover: "/images/slide-red.jpg",
    tracks: [
      { id: "badna-nwalee", title: { en: "Badna Nwalee El Jaw", ar: "بدنا نولع الجو" }, file: "audio/nancy-9/badna-nwalee.mp3" },
      { id: "hassa-beek", title: { en: "Hassa Beek", ar: "حاسة بيك" }, file: "audio/nancy-9/hassa-beek.mp3" },
    ],
  },
  {
    id: "nancy-10",
    title: { en: "Nancy 10", ar: "نانسي ١٠" },
    year: 2021,
    cover: "/images/slide-coffee.jpg",
    tracks: [
      { id: "aam-betaala", title: { en: "Aam Betaala' Feek", ar: "عم بتقلق فيك" }, file: "audio/nancy-10/aam-betaala.mp3" },
      { id: "salamat", title: { en: "Salamat", ar: "سلامات" }, file: "audio/nancy-10/salamat.mp3" },
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

export const gallery = [
  {
    src: "/images/slide-fur.jpg",
    year: 2018,
    album: "Portraits",
    alt: "Nancy Ajram in fur",
  },
  {
    src: "/images/slide-street.jpg",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram white dress",
  },
  {
    src: "/images/slide-box.jpg",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram with a jewelry box",
  },
  {
    src: "/images/slide-jewels.jpg",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram in jewels",
  },
  {
    src: "/images/slide-blue-glam.jpg",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram on a blue backdrop",
  },
  {
    src: "/images/slide-red.jpg",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram in white on red",
  },
  {
    src: "/images/slide-flowers.jpg",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram in a black dress with flowers",
  },
  {
    src: "/images/slide-tiffany-blue.jpg",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram in a diamond necklace",
  },
  {
    src: "/images/slide-tiffany-gold.webp",
    year: 2024,
    album: "Latest",
    alt: "Nancy Ajram at a Tiffany event",
  },
  {
    src: "/images/slide-coffee.jpg",
    year: 2023,
    album: "Portraits",
    alt: "Nancy Ajram coffee",
  },
  {
    src: "/images/slide-gala.webp",
    year: 2015,
    album: "Red carpet",
    alt: "Nancy Ajram gala",
  },
  {
    src: "/images/slide-closeup.jpg",
    year: 2008,
    album: "Classic",
    alt: "Nancy Ajram classic portrait",
  },
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
