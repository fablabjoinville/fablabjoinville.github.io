import * as React from 'react';
/** Modal dialog with title bar, body and actions. */
export interface DialogProps { open: boolean; title?: React.ReactNode; children?: React.ReactNode; actions?: React.ReactNode; onClose?: () => void; width?: number; /** Render without backdrop (for docs/previews) */ inline?: boolean; }
export declare function Dialog(props: DialogProps): JSX.Element | null;
