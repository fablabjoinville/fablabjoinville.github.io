import * as React from 'react';
/** Radio group. */
export interface RadioProps { name?: string; options: Array<string | { value: string; label: string }>; value?: string; defaultValue?: string; onChange?: (v: string) => void; direction?: 'row' | 'column'; }
export declare function Radio(props: RadioProps): JSX.Element;
