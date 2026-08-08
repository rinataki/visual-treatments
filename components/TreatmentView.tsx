"use client";

import { useState } from "react";
import Link from "next/link";
import { registry, defaultParams } from "@/lib/registry";
import { Controls } from "@/components/Controls";
import { CodeBlock } from "@/components/CodeBlock";
import type { ParamValues } from "@/lib/treatment-schema";

export function TreatmentView({ slug }: { slug: string }) {
  const entry = registry[slug];
  const { meta, Demo } = entry;
  const [params, setParams] = useState<ParamValues>(() => defaultParams(meta));

  function onChange(key: string, value: number | string | boolean) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--fg)]">
        ← All treatments
      </Link>

      <header className="mt-4 mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
            {meta.category}
          </span>
          {meta.feelings.map((f) => (
            <span
              key={f}
              className="rounded-full bg-[var(--card)] px-2 py-0.5 text-xs text-[var(--muted)]"
            >
              {f}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{meta.name}</h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">{meta.description}</p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_260px]">
        {/* Live preview */}
        <div
          className="relative min-h-[340px] overflow-hidden rounded-lg border border-[var(--border)]"
          style={{ background: meta.previewBackground }}
        >
          <Demo params={params} />
        </div>

        {/* Controls */}
        <aside>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Controls
          </h2>
          <Controls controls={meta.controls} params={params} onChange={onChange} />
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Implementations
        </h2>
        <CodeBlock
          implementations={meta.implementations}
          controls={meta.controls}
          params={params}
        />
      </section>
    </main>
  );
}
