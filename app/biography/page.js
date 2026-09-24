import BioView from "@/components/BioView";

export const metadata = {
  title: { absolute: "Nancy Ajram Biography | سيرة نانسي عجرم" },
  description:
    "Nancy Ajram biography — born in Beirut, Lebanese Queen of Arab Pop. Career, awards and UNICEF. سيرة نانسي عجرم.",
  alternates: { canonical: "/biography" },
  openGraph: { url: "/biography", title: "Nancy Ajram Biography | سيرة نانسي عجرم" },
};

export default function BiographyPage() {
  return <BioView />;
}
