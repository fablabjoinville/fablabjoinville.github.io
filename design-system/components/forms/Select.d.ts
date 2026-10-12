import * as React from 'react';
/** Native select styled to match Input. */
export interface SelectProps { label?: string; options: Array<string | { value: string; label: string }>; value?: string; defaultValue?: string; onChange?: (v: string) => void; disabled?: boolean; style?: React.CSSProperties; }
export declare function Select(props: SelectProps): JSX.Element;
