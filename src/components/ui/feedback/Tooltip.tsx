import * as React from 'react';
import './feedback.css';

/** Mono tooltip on hover. */
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom';
  /** Force visible */
  open?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CSS-driven tooltip: shown on :hover / :focus-within of the wrapper, so it
 * works as static HTML without hydration. `open` forces it visible (true) or
 * suppresses it (false); undefined leaves it to hover/focus.
 * The trigger (single element child) receives aria-describedby; otherwise the
 * wrapper carries it.
 */
export function Tooltip({ content, children, placement = 'top', open, className, style }: TooltipProps) {
  const tipId = React.useId();

  let trigger: React.ReactNode = children;
  let describedOnWrapper = true;
  if (React.isValidElement<{ 'aria-describedby'?: string }>(children)) {
    const existing = children.props['aria-describedby'];
    trigger = React.cloneElement(children, {
      'aria-describedby': existing ? `${existing} ${tipId}` : tipId,
    });
    describedOnWrapper = false;
  }

  const classes = [
    'flj-tooltip',
    `flj-tooltip--${placement}`,
    open === true && 'flj-tooltip--open',
    open === false && 'flj-tooltip--closed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={style} aria-describedby={describedOnWrapper ? tipId : undefined}>
      {trigger}
      <span role="tooltip" id={tipId} className="flj-tooltip__bubble">
        {content}
      </span>
    </span>
  );
}
