import { useId } from "react";
import type { CSSProperties } from "react";
import "./forms.css";
import { cx } from "@/lib/cx";

export type RadioOption = string | { value: string; label: string };

/** Radio group (one-of-many choice). */
export interface RadioProps {
  name?: string;
  options: Array<RadioOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  direction?: "row" | "column";
  className?: string;
  style?: CSSProperties;
}

export function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  direction = "column",
  className,
  style,
}: RadioProps) {
  const baseId = useId();
  const groupName = name ?? baseId;
  const controlled = value !== undefined;

  return (
    <div
      role="radiogroup"
      className={cx(
        "flj-radio-group",
        direction === "row" && "flj-radio-group--row",
        className,
      )}
      style={style}
    >
      {options.map((o, i) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        const id = `${baseId}-${i}`;
        const stateProps = controlled
          ? { checked: value === v }
          : { defaultChecked: defaultValue === v };
        return (
          <label key={v} htmlFor={id} className="flj-radio">
            <input
              id={id}
              type="radio"
              name={groupName}
              value={v}
              className="flj-sr-input flj-radio__input"
              onChange={(e) => {
                if (e.target.checked) onChange?.(v);
              }}
              {...stateProps}
            />
            <span className="flj-radio__dot" aria-hidden="true" />
            {l}
          </label>
        );
      })}
    </div>
  );
}
