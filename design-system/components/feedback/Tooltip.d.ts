import * as React from 'react';
/** Mono tooltip on hover. */
export interface TooltipProps { content: React.ReactNode; children: React.ReactNode; placement?: 'top' | 'bottom'; /** Force visible */ open?: boolean; }
export declare function Tooltip(props: TooltipProps): JSX.Element;
