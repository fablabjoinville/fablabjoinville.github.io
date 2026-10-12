import * as React from 'react';
/** Square-track toggle switch. */
export interface SwitchProps { label?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean; }
export declare function Switch(props: SwitchProps): JSX.Element;
