"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { registry, previewParams } from "@/lib/registry";
import { CATEGORIES, categoryColor } from "@/lib/categories";
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
              className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* Full-bleed live preview thumbnail */}
              <div
                className="relative m-1.5 h-48 overflow-hidden rounded-xl"
                style={{ background: meta.previewBackground }}
              >
                <Demo params={previewParams(meta)} />
              </div>

              {/* Footer: icon · title/meta · swatch */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <CategoryIcon category={meta.category} />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-mono text-sm font-semibold tracking-tight">
                    {meta.name}
                  </h2>
                  <p className="font-mono text-xs text-[var(--muted)]">
                    {meta.category} · {meta.implementations.length}{" "}
                    {meta.implementations.length === 1 ? "method" : "methods"}
                  </p>
                </div>
                <span
                  className="h-8 w-8 shrink-0 rounded-full border border-[var(--border)]"
                  style={{ background: meta.previewBackground }}
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

// Small app-style icon: a rounded square in the category color with a simple
// white glyph, echoing the reference file-card layout.
function CategoryIcon({ category }: { category: Category }) {
  const glyph: Record<Category, React.ReactNode> = {
    texture: (
      <>
        <circle cx="6" cy="6" r="1" /><circle cx="12" cy="6" r="1" /><circle cx="18" cy="6" r="1" />
        <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="6" cy="18" r="1" />
        <circle cx="12" cy="18" r="1" /><circle cx="18" cy="18" r="1" />
      </>
    ),
    material: <circle cx="12" cy="12" r="6" />,
    pattern: (
      <>
        <circle cx="7" cy="7" r="1.6" /><circle cx="17" cy="7" r="1.6" />
        <circle cx="7" cy="17" r="1.6" /><circle cx="17" cy="17" r="1.6" />
      </>
    ),
    lighting: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M18 18l-2-2M18 6l-2 2M6 18l2-2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
    typography: <text x="12" y="17" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="ui-monospace, monospace">A</text>,
    motion: <path d="M8 6l10 6-10 6z" />,
  };
  return (
    <span
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white"
      style={{ background: categoryColor(category) }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        {glyph[category]}
      </svg>
    </span>
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
