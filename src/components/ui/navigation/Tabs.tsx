import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import "./navigation.css";

export type TabItem = string | { value: string; label: string };

/** Segmented tab bar — selected tab fills navy. */
export interface TabsProps {
  tabs: Array<TabItem>;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

const tabValue = (t: TabItem) => (typeof t === "string" ? t : t.value);
const tabLabel = (t: TabItem) => (typeof t === "string" ? t : t.label);

export function Tabs({ tabs = [], value, defaultValue, onChange, className, style }: TabsProps) {
  const [inner, setInner] = useState<string | undefined>(
    defaultValue ?? (tabs[0] !== undefined ? tabValue(tabs[0]) : undefined),
  );
  const current = value !== undefined ? value : inner;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (v: string) => {
    if (value === undefined) setInner(v);
    if (v !== current) onChange?.(v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = tabs.length;
    if (!count) return;
    const idx = Math.max(
      0,
      tabs.findIndex((t) => tabValue(t) === current),
    );
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (idx + 1) % count;
    else if (e.key === "ArrowLeft") next = (idx - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next === null) return;
    e.preventDefault();
    select(tabValue(tabs[next]));
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={["flj-tabs", className].filter(Boolean).join(" ")}
      style={style}
      onKeyDown={onKeyDown}
    >
      {tabs.map((t, i) => {
        const v = tabValue(t);
        const on = v === current;
        return (
          <button
            key={v}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            className={["flj-tabs__tab", on && "flj-tabs__tab--selected"].filter(Boolean).join(" ")}
            onClick={() => select(v)}
          >
            {tabLabel(t)}
          </button>
        );
      })}
    </div>
  );
}
