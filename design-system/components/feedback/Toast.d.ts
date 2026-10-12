import * as React from 'react';
/** Navy notification with colored hard-shadow status edge. */
export interface ToastProps { tone?: 'success' | 'info' | 'warning' | 'danger'; title?: React.ReactNode; children?: React.ReactNode; onClose?: () => void; }
export declare function Toast(props: ToastProps): JSX.Element;
