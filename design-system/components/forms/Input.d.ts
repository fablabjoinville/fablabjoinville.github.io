import * as React from 'react';
/**
 * Text field with mono uppercase label; focus shows an orange offset shadow.
 * @startingPoint section="Forms" subtitle="Inscription form fields" viewport="700x320"
 */
export interface InputProps { label?: string; hint?: string; error?: string; placeholder?: string; value?: string; defaultValue?: string; onChange?: (v: string) => void; type?: string; disabled?: boolean; multiline?: boolean; rows?: number; style?: React.CSSProperties; }
export declare function Input(props: InputProps): JSX.Element;
