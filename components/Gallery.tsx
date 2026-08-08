"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { registry, defaultParams } from "@/lib/registry";
import { CATEGORIES } from "@/lib/categories";
import type { Category } from "@/lib/treatment-schema";

type Filter = "all" | Category;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const entries = Object.entries(registry);

  // Count treatments per category once.
  const counts = useMemo(() => {
    const c: Partial<Record<Category, number>> = {};
    for (const [, { meta }] of entries) {
      c[meta.category] = (c[meta.category] ?? 0) + 1;
    }
    return c;
  }, [entries]);

  const visible = entries.filter(
    ([, { meta }]) => filter === "all" || meta.category === filter,
  );

  return (
    <>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Chip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All"
          count={entries.length}
        />
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.key}
            active={filter === cat.key}
            onClick={() => setFilter(cat.key)}
            label={cat.label}
            count={counts[cat.key] ?? 0}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState category={filter} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {visible.map(([slug, { meta, Demo }]) => (
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
      )}
    </>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  const empty = count === 0;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
          : "border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg)]"
      } ${empty && !active ? "opacity-50" : ""}`}
    >
      {label}
      <span
        className={`tabular-nums text-xs ${
          active ? "text-[var(--bg)]" : "text-[var(--muted)]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function EmptyState({ category }: { category: Filter }) {
  const label =
    CATEGORIES.find((c) => c.key === category)?.label ?? "this category";
  return (
    <div className="rounded-xl border border-dashed border-[var(--border)] p-12 text-center">
      <p className="mb-1 font-medium">No {label.toLowerCase()} yet</p>
      <p className="mx-auto max-w-md text-sm text-[var(--muted)]">
        This category is on the roadmap. Contributions welcome — treatments are
        just a folder and a metadata file.
      </p>
      <a
        href="https://github.com/rinataki/visual-treatments"
        className="mt-4 inline-block text-sm underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--fg)]"
      >
        Contribute one →
      </a>
    </div>
  );
}
