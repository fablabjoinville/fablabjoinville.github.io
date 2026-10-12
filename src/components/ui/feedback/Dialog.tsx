import * as React from 'react';
import { IconButton } from '../core/IconButton';
import './feedback.css';

/** Modal dialog with title bar, body and actions. */
export interface DialogProps {
  open: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  /** Render without backdrop (for docs/previews) */
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/**
 * Modal built on the native <dialog> element: `showModal()` gives focus
 * trapping, top-layer stacking and a ::backdrop (navy 55%). The component is
 * controlled — Escape and backdrop clicks call `onClose`; the parent flips `open`.
 * `inline` renders the panel statically (no backdrop, no JS needed) for previews.
 */
export function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  width = 480,
  inline,
  className,
  style,
}: DialogProps) {
  const titleId = React.useId();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  // Sync the controlled `open` prop with the native modal state.
  React.useEffect(() => {
    if (inline) return;
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) {
      if (typeof el.showModal === 'function') el.showModal();
      else el.setAttribute('open', '');
    } else if (!open && el.open) {
      el.close();
    }
  }, [open, inline]);

  // Escape fires `cancel`: keep the dialog controlled and delegate to onClose.
  React.useEffect(() => {
    if (inline) return;
    const el = dialogRef.current;
    if (!el) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onCloseRef.current?.();
    };
    el.addEventListener('cancel', handleCancel);
    return () => el.removeEventListener('cancel', handleCancel);
  }, [inline]);

  // Close the native modal if the component unmounts while open.
  React.useEffect(() => {
    const el = dialogRef.current;
    return () => {
      if (el?.open) el.close();
    };
  }, []);

  const sizeStyle = { '--flj-dialog-w': `${width}px`, ...style } as React.CSSProperties;

  const panel = (
    <>
      <div className="flj-dialog__header">
        <h3 id={titleId} className="flj-dialog__title">
          {title}
        </h3>
        {onClose && (
          <IconButton icon="x" label="Fechar" variant="ghost" size={32} onClick={onClose} />
        )}
      </div>
      <div className="flj-dialog__body">{children}</div>
      {actions && <div className="flj-dialog__actions">{actions}</div>}
    </>
  );

  if (inline) {
    if (!open) return null;
    return (
      <div
        role="dialog"
        aria-labelledby={title ? titleId : undefined}
        className={cx('flj-dialog', 'flj-dialog--inline', className)}
        style={sizeStyle}
      >
        {panel}
      </div>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : undefined}
      aria-modal="true"
      className={cx('flj-dialog', 'flj-dialog--modal', className)}
      style={sizeStyle}
      onClick={(e) => {
        // The panel fills the <dialog> box, so a click whose target is the
        // <dialog> itself landed on the ::backdrop.
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="flj-dialog__panel">{panel}</div>
    </dialog>
  );
}
