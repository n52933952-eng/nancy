import BioView from "@/components/BioView";

export const metadata = {
  title: "Biography",
  description:
    "Nancy Ajram biography — نانسي عجرم from Beirut to Arab pop icon. Career, UNICEF, awards.",
  alternates: { canonical: "/biography" },
  openGraph: { url: "/biography" },
};

export default function BiographyPage() {
  return <BioView />;
}
