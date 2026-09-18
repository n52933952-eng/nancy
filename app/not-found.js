import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.3em] text-gold uppercase">Nancy Ajram</p>
      <h1 className="mt-4 font-display text-5xl text-cream">404</h1>
      <Link href="/" className="gold-btn mt-8">
        Home
      </Link>
    </main>
  );
}
