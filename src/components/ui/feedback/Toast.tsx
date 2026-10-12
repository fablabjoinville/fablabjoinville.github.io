import * as React from 'react';
import { Icon } from '../core/Icon';
import './feedback.css';

export type ToastTone = 'success' | 'info' | 'warning' | 'danger';

/** Navy notification with colored hard-shadow status edge. */
export interface ToastProps {
  tone?: ToastTone;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const TONE_ICON: Record<ToastTone, string> = {
  success: 'circle-check',
  info: 'info',
  warning: 'triangle-alert',
  danger: 'circle-x',
};

export function Toast({ tone = 'success', title, children, onClose, className, style }: ToastProps) {
  const classes = ['flj-toast', `flj-toast--${tone}`, className].filter(Boolean).join(' ');
  return (
    <div role="status" className={classes} style={style}>
      <span className="flj-toast__icon">
        <Icon name={TONE_ICON[tone]} size={20} color={`var(--status-${tone})`} />
      </span>
      <div className="flj-toast__content">
        {title && <div className="flj-toast__title">{title}</div>}
        {children && <div className="flj-toast__message">{children}</div>}
      </div>
      {onClose && (
        <button type="button" className="flj-toast__close" onClick={onClose} aria-label="Fechar">
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
