import * as React from 'react';
/**
 * Uppercase mono button. On hover it lifts and reveals a hard offset shadow (the extruded-symbol motif).
 * @startingPoint section="Actions" subtitle="Primary, accent, secondary, ghost buttons" viewport="700x260"
 */
export interface ButtonProps { variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'inverse'; size?: 'sm' | 'md' | 'lg'; /** Lucide icon name before label */ icon?: string; iconRight?: string; disabled?: boolean; fullWidth?: boolean; type?: 'button' | 'submit'; onClick?: () => void; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Button(props: ButtonProps): JSX.Element;
