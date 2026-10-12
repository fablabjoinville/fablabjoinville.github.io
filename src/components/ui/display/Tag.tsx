import type { CSSProperties, ReactNode } from 'react';
import './display.css';
import { cx } from '@/lib/cx';

/** Pill-shaped filter chip / topic tag. */
export interface TagProps {
  children?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function Tag({ children, selected, onClick, onRemove, className, style }: TagProps) {
  const cls = cx(
    'flj-tag',
    selected && 'flj-tag--selected',
    onClick && 'flj-tag--clickable',
    onRemove && 'flj-tag--removable',
    className,
  );

  const removeLabel =
    typeof children === 'string' || typeof children === 'number' ? `Remover ${children}` : 'Remover';

  return (
    <span className={cls} style={style}>
      {onClick ? (
        <button
          type="button"
          className="flj-tag__label flj-tag__btn"
          aria-pressed={selected ? true : false}
          onClick={() => onClick()}
        >
          {children}
        </button>
      ) : (
        <span className="flj-tag__label">{children}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className="flj-tag__remove flj-tag__btn"
          aria-label={removeLabel}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
}
