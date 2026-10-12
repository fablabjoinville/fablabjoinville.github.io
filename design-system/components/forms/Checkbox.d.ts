import * as React from 'react';
/** Square 2px-outlined checkbox. Controlled or uncontrolled. */
export interface CheckboxProps { label?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean; }
export declare function Checkbox(props: CheckboxProps): JSX.Element;
