import * as React from 'react';
/**
 * Workshop / hackathon / event listing card with date block.
 * @startingPoint section="Content" subtitle="Event & workshop cards" viewport="700x420"
 */
export interface EventCardProps { image?: string; day?: string; month?: string; title: string; kind?: string; description?: string; place?: string; time?: string; badge?: string; badgeTone?: 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info'; onClick?: () => void; }
export declare function EventCard(props: EventCardProps): JSX.Element;
