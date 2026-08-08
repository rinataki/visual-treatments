"use client";

import type { Control, ParamValues } from "@/lib/treatment-schema";

export function Controls({
  controls,
  params,
  onChange,
}: {
  controls: Control[];
  params: ParamValues;
  onChange: (key: string, value: number | string | boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {controls.map((c) => (
        <div key={c.key} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor={c.key} className="font-medium">
              {c.label}
            </label>
            {c.type === "range" && (
              <span className="tabular-nums text-[var(--muted)]">
                {String(params[c.key])}
                {c.unit ?? ""}
              </span>
            )}
          </div>

          {c.type === "range" && (
            <input
              id={c.key}
              type="range"
              min={c.min}
              max={c.max}
              step={c.step ?? 1}
              value={Number(params[c.key])}
              onChange={(e) => onChange(c.key, Number(e.target.value))}
              className="w-full accent-[var(--fg)]"
            />
          )}

          {c.type === "color" && (
            <input
              id={c.key}
              type="color"
              value={String(params[c.key])}
              onChange={(e) => onChange(c.key, e.target.value)}
              className="h-9 w-full cursor-pointer rounded border border-[var(--border)] bg-transparent"
            />
          )}

          {c.type === "select" && (
            <select
              id={c.key}
              value={String(params[c.key])}
              onChange={(e) => onChange(c.key, e.target.value)}
              className="h-9 rounded border border-[var(--border)] bg-transparent px-2 text-sm"
            >
              {c.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}

          {c.type === "toggle" && (
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                id={c.key}
                type="checkbox"
                checked={Boolean(params[c.key])}
                onChange={(e) => onChange(c.key, e.target.checked)}
                className="accent-[var(--fg)]"
              />
              <span className="text-[var(--muted)]">
                {Boolean(params[c.key]) ? "On" : "Off"}
              </span>
            </label>
          )}

          {c.help && (
            <p className="text-xs text-[var(--muted)]">{c.help}</p>
          )}
        </div>
      ))}
    </div>
  );
}
