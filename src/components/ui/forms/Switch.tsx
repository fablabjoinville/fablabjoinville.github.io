import { useId } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./forms.css";
import { cx } from "@/lib/cx";

/** Square-track toggle switch for immediate on/off settings. */
export interface SwitchProps {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  style,
}: SwitchProps) {
  const id = useId();
  const stateProps = checked !== undefined ? { checked } : { defaultChecked: !!defaultChecked };

  return (
    <label
      htmlFor={id}
      className={cx("flj-switch", disabled && "flj-switch--disabled", className)}
      style={style}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="flj-sr-input flj-switch__input"
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        {...stateProps}
      />
      <span className="flj-switch__track" aria-hidden="true">
        <span className="flj-switch__thumb" />
      </span>
      {label}
    </label>
  );
}
