import * as React from 'react';
/** Container surface. Interactive cards lift with a hard navy offset shadow. */
export interface CardProps { children?: React.ReactNode; variant?: 'outline' | 'paper' | 'inverse'; interactive?: boolean; padding?: number | string; onClick?: () => void; style?: React.CSSProperties; }
export declare function Card(props: CardProps): JSX.Element;
