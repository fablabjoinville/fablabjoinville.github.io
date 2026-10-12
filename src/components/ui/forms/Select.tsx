import { useId } from "react";
import type { CSSProperties } from "react";
import "./forms.css";
import { cx } from "@/lib/cx";

export type SelectOption = string | { value: string; label: string };

/** Native select styled to match Input. */
export interface SelectProps {
  label?: string;
  options: Array<SelectOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  disabled,
  style,
  className,
}: SelectProps) {
  const id = useId();
  const valueProps = value !== undefined ? { value } : { defaultValue };

  return (
    <div className={cx("flj-field", className)} style={style}>
      {label && (
        <label className="flj-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <span className="flj-select">
        <select
          id={id}
          className="flj-select__control"
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          {...valueProps}
        >
          {options.map((o) =>
            typeof o === "string" ? (
              <option key={o} value={o}>
                {o}
              </option>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ),
          )}
        </select>
        <span className="flj-select__arrow" aria-hidden="true">
          ▼
        </span>
      </span>
    </div>
  );
}
