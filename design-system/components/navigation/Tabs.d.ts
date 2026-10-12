import * as React from 'react';
/** Segmented tab bar — selected tab fills navy. */
export interface TabsProps { tabs: Array<string | { value: string; label: string }>; value?: string; defaultValue?: string; onChange?: (v: string) => void; }
export declare function Tabs(props: TabsProps): JSX.Element;
