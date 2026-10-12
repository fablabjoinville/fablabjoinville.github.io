import * as React from 'react';
/** Small mono status label (vagas, nível, status). */
export interface BadgeProps { tone?: 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info'; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Badge(props: BadgeProps): JSX.Element;
