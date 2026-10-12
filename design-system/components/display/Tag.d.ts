import * as React from 'react';
/** Pill-shaped filter chip / topic tag. */
export interface TagProps { children?: React.ReactNode; selected?: boolean; onClick?: () => void; onRemove?: () => void; }
export declare function Tag(props: TagProps): JSX.Element;
