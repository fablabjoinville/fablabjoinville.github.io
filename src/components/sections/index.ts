/**
 * Section library — static page building blocks (React TSX rendered to HTML at
 * build time, no client directive needed) + ContactBlock (.astro).
 *
 *   import { Section, PageHeader, Photo, CardGrid, ... } from '@/components/sections';
 *
 * Images: prepare with `img()`/`imgs()` from '@/lib/images' in the page
 * frontmatter and pass the ResponsiveImage (or a raw ImageMetadata) as `image`.
 *
 * Islands are NOT exported here (hydration needs their own module); import them
 * directly and add a client directive:
 *   import { VideoFacade } from '@/components/islands/VideoFacade';
 *   import { Carousel } from '@/components/islands/Carousel';
 *   import { MapEmbed } from '@/components/islands/MapEmbed'; (static, no client directive)
 * Islands themselves must never import this barrel (it contains an .astro file);
 * they import '@/components/sections/Picture' directly.
 */
export { Picture, type PictureProps } from './Picture';
export { Section, type SectionProps } from './Section';
export { PageHeader, type PageHeaderProps } from './PageHeader';
export { Hero, type HeroProps } from './Hero';
export { Photo, type PhotoProps } from './Photo';
export { Prose, type ProseProps } from './Prose';
export { CardGrid, type CardGridProps } from './CardGrid';
export { FeatureCard, type FeatureCardProps } from './FeatureCard';
export { PersonCard, type PersonCardProps } from './PersonCard';
export { LogoGrid, type LogoGridProps, type LogoGridItem } from './LogoGrid';
export { QaList, faqJsonLd, type QaListProps, type QaItem } from './QaList';
export { Gallery, type GalleryProps, type GalleryImage } from './Gallery';
export { PricingCard, type PricingCardProps, type PricingPrice, type PricingCta } from './PricingCard';
export { ProjectBlock, type ProjectBlockProps, type ProjectLink } from './ProjectBlock';
export { Testimonial, type TestimonialProps } from './Testimonial';
export { CtaBand, type CtaBandProps } from './CtaBand';
export { SocialLinks, type SocialLinksProps } from './SocialLinks';
export { InstagramFeed, cleanCaption, type InstagramFeedProps } from './InstagramFeed';
export { ContactDetails, VisitCard, type ContactDetailsProps, type VisitCardProps } from './ContactDetails';
export { default as ContactBlock } from './ContactBlock.astro';
export { default as MachineStrip } from './MachineStrip.astro';
export { default as PhotoHero } from './PhotoHero.astro';
export { default as VisitMap } from './VisitMap.astro';
export { slugify, linkAttrs, isExternal, stripHtml, type HeadingLevel } from './utils';
export type { ResponsiveImage, ImageSource } from '@/lib/images';
