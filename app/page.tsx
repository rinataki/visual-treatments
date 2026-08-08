import { Gallery } from "@/components/Gallery";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">Visual Treatments</h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          An open-source library of production-ready interface aesthetics for
          design engineers. Browse by category, tune live, and copy.
        </p>
      </header>

      <Gallery />
    </main>
  );
}
