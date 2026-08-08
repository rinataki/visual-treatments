import Link from "next/link";
import { registry, defaultParams } from "@/lib/registry";

export default function Home() {
  const entries = Object.entries(registry);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">Visual Treatments</h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          An open-source library of production-ready interface aesthetics for
          design engineers. Browse, tune, and copy.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {entries.map(([slug, { meta, Demo }]) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="group overflow-hidden rounded-xl border border-[var(--border)] transition-colors hover:border-[var(--fg)]"
          >
            <div
              className="relative h-44 overflow-hidden"
              style={{ background: meta.previewBackground }}
            >
              <Demo params={defaultParams(meta)} />
            </div>
            <div className="p-4">
              <div className="mb-1 flex items-center gap-2">
                <h2 className="font-medium">{meta.name}</h2>
                <span className="text-xs text-[var(--muted)]">{meta.category}</span>
              </div>
              <p className="text-sm text-[var(--muted)]">{meta.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
