import * as React from 'react';
/** Square icon-only button. Always pass a label for accessibility. */
export interface IconButtonProps { icon: string; label: string; variant?: 'primary' | 'secondary' | 'ghost'; size?: number; disabled?: boolean; onClick?: () => void; style?: React.CSSProperties; }
export declare function IconButton(props: IconButtonProps): JSX.Element;
