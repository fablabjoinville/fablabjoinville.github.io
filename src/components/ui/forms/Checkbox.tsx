import { useId } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./forms.css";
import { cx } from "@/lib/cx";

/** Square 2px-outlined checkbox. Controlled or uncontrolled. */
export interface CheckboxProps {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  style,
}: CheckboxProps) {
  const id = useId();
  const stateProps = checked !== undefined ? { checked } : { defaultChecked: !!defaultChecked };

  return (
    <label
      htmlFor={id}
      className={cx("flj-check", disabled && "flj-check--disabled", className)}
      style={style}
    >
      <input
        id={id}
        type="checkbox"
        className="flj-sr-input flj-check__input"
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        {...stateProps}
      />
      <span className="flj-check__box" aria-hidden="true" />
      {label}
    </label>
  );
}
