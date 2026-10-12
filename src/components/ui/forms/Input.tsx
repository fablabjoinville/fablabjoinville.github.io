import { useId } from "react";
import type { CSSProperties } from "react";
import "./forms.css";
import { cx } from "@/lib/cx";

/**
 * Text field with mono uppercase label; focus shows an orange offset shadow.
 * `multiline` renders a textarea.
 */
export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  style?: CSSProperties;
  className?: string;
}

export function Input({
  label,
  hint,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = "text",
  disabled,
  multiline,
  rows = 4,
  style,
  className,
}: InputProps) {
  const id = useId();
  const messageId = `${id}-msg`;
  const message = error || hint;
  const controlClass = cx(
    "flj-input",
    multiline && "flj-input--multiline",
    error && "flj-input--error",
  );

  const shared = {
    id,
    className: controlClass,
    placeholder,
    disabled,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": message ? messageId : undefined,
    ...(value !== undefined ? { value } : { defaultValue }),
  };

  return (
    <div className={cx("flj-field", className)} style={style}>
      {label && (
        <label className="flj-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea {...shared} rows={rows} onChange={(e) => onChange?.(e.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange?.(e.target.value)} />
      )}
      {message && (
        <span
          id={messageId}
          className={cx("flj-field__message", error && "flj-field__message--error")}
          role={error ? "alert" : undefined}
        >
          {message}
        </span>
      )}
    </div>
  );
}
