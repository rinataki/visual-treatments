"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { registry, defaultParams } from "@/lib/registry";
import { Controls } from "@/components/Controls";
import { CodeBlock } from "@/components/CodeBlock";
import { paramsFromQuery, queryFromParams } from "@/lib/share-state";
import type { ParamValues } from "@/lib/treatment-schema";

export function TreatmentView({ slug }: { slug: string }) {
  const entry = registry[slug];
  const { meta, Demo } = entry;
  const isText = meta.surface === "text";
  const [params, setParams] = useState<ParamValues>(() => defaultParams(meta));
  const [sample, setSample] = useState(meta.sampleText ?? "Aa");

  // The URL is hydrated *after* mount, not during render: the server has no
  // query string, so reading it in the initial state would desync hydration.
  // Until this has run, writing back is suppressed — otherwise the first effect
  // pass would clear an incoming shared link before we ever read it.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const { params: fromUrl, sample: fromUrlText } = paramsFromQuery(
      meta,
      window.location.search,
      defaultParams(meta),
    );
    setParams(fromUrl);
    if (fromUrlText !== null) setSample(fromUrlText);
    setHydrated(true);
  }, [meta]);

  useEffect(() => {
    if (!hydrated) return;
    const query = queryFromParams(meta, params, isText ? sample : null);
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  }, [meta, params, sample, isText, hydrated]);

  function onChange(key: string, value: number | string | boolean) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  const demoParams = isText ? { ...params, __text: sample } : params;

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
          <Demo params={demoParams} />
        </div>

        {/* Controls */}
        <aside>
          <div className="mb-4 flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Controls
            </h2>
            <ShareButton />
          </div>
          {isText && (
            <div className="mb-5 flex flex-col gap-1.5">
              <label htmlFor="sample" className="text-sm font-medium">
                Sample text
              </label>
              <input
                id="sample"
                value={sample}
                onChange={(e) => setSample(e.target.value)}
                className="h-9 rounded border border-[var(--border)] bg-transparent px-2 text-sm"
              />
            </div>
          )}
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

// Copies whatever is in the address bar — which the effect above keeps in sync
// with the canvas, so there is nothing to serialize here.
function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      title="Copy a link to this treatment with your current settings"
      className="text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
    >
      {copied ? "Link copied ✓" : "Copy link"}
    </button>
  );
}
