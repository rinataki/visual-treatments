"use client";

import { useState } from "react";
import type { Control, Implementation, ParamValues } from "@/lib/treatment-schema";
import { interpolate } from "@/lib/treatment-schema";

export function CodeBlock({
  implementations,
  controls,
  params,
}: {
  implementations: Implementation[];
  controls: Control[];
  params: ParamValues;
}) {
  const [active, setActive] = useState(
    Math.max(0, implementations.findIndex((i) => i.recommended)),
  );
  const [copied, setCopied] = useState(false);
  const impl = implementations[active];
  const rendered = interpolate(impl.code, controls, params);

  async function copy() {
    await navigator.clipboard.writeText(rendered);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-2">
        <div className="flex">
          {implementations.map((i, idx) => (
            <button
              key={i.kind}
              onClick={() => setActive(idx)}
              className={`px-3 py-2 text-sm transition-colors ${
                idx === active
                  ? "font-medium text-[var(--fg)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
            >
              {i.label}
              {i.recommended && (
                <span className="ml-1.5 text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  rec
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="rounded px-2.5 py-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--fg)]"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {impl.note && (
        <p className="border-b border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--muted)]">
          {impl.note}
        </p>
      )}

      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>{rendered}</code>
      </pre>
    </div>
  );
}
