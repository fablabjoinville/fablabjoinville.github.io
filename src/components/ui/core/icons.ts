/**
 * Static icon registry for <Icon>.
 *
 * - UI glyphs come from `lucide-static` (v0.460.0). Each named export is a full
 *   `<svg>` string; only the icons imported here end up in the bundle
 *   (lucide-static is `sideEffects: false`, one module per icon).
 * - Brand glyphs come from `simple-icons` (filled 24x24 paths). `simple-icons`
 *   no longer ships LinkedIn (removed at the brand owner's request), so
 *   `linkedin` falls back to Lucide's outline glyph.
 *
 * To add an icon: import it below and add a kebab-case key to LUCIDE or BRANDS.
 */
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  Bot,
  Box,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleCheckBig,
  CircleX,
  Clock,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Hammer,
  Handshake,
  Heart,
  House,
  Image as ImageIcon,
  Info,
  Layers,
  Lightbulb,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Map as MapIcon,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Newspaper,
  Phone,
  Play,
  Plus,
  Printer,
  Quote,
  Rocket,
  Scissors,
  Search,
  Share2,
  Sparkles,
  Star,
  Ticket,
  TriangleAlert,
  Trophy,
  Users,
  Video,
  Wrench,
  X,
  Zap,
} from 'lucide-static';
import { siFacebook, siGithub, siInstagram, siWhatsapp, siYoutube } from 'simple-icons';

/** Strip the outer `<svg ...>` / `</svg>` from a lucide-static string. */
function inner(svg: string): string {
  const start = svg.indexOf('>') + 1;
  const end = svg.lastIndexOf('</svg>');
  return svg.slice(start, end).replace(/>\s+</g, '><').trim();
}

const LUCIDE_SOURCES = {
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-up-right': ArrowUpRight,
  'external-link': ExternalLink,
  printer: Printer,
  scissors: Scissors,
  bot: Bot,
  cpu: Cpu,
  wrench: Wrench,
  users: Users,
  calendar: Calendar,
  'calendar-days': CalendarDays,
  clock: Clock,
  'map-pin': MapPin,
  map: MapIcon,
  mail: Mail,
  menu: Menu,
  x: X,
  search: Search,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  play: Play,
  check: Check,
  plus: Plus,
  minus: Minus,
  info: Info,
  // `alert-triangle` is the pre-0.400 name of `triangle-alert`; keep both.
  'alert-triangle': TriangleAlert,
  'triangle-alert': TriangleAlert,
  'circle-alert': CircleAlert,
  'circle-check': CircleCheck,
  'circle-check-big': CircleCheckBig,
  'circle-x': CircleX,
  heart: Heart,
  handshake: Handshake,
  'building-2': Building2,
  'graduation-cap': GraduationCap,
  lightbulb: Lightbulb,
  rocket: Rocket,
  award: Award,
  trophy: Trophy,
  video: Video,
  image: ImageIcon,
  'file-text': FileText,
  link: LinkIcon,
  phone: Phone,
  'message-circle': MessageCircle,
  globe: Globe,
  sparkles: Sparkles,
  hammer: Hammer,
  layers: Layers,
  box: Box,
  zap: Zap,
  star: Star,
  quote: Quote,
  download: Download,
  ticket: Ticket,
  'share-2': Share2,
  newspaper: Newspaper,
  house: House,
  // Brand fallback: simple-icons dropped LinkedIn.
  linkedin: Linkedin,
} as const;

const BRAND_SOURCES = {
  instagram: siInstagram,
  whatsapp: siWhatsapp,
  youtube: siYoutube,
  github: siGithub,
  facebook: siFacebook,
} as const;

export type LucideIconName = keyof typeof LUCIDE_SOURCES;
export type BrandIconName = keyof typeof BRAND_SOURCES;
export type IconName = LucideIconName | BrandIconName;

export type IconDef =
  | { kind: 'stroke'; markup: string }
  | { kind: 'fill'; path: string };

const REGISTRY = new Map<string, IconDef>();
for (const [name, svg] of Object.entries(LUCIDE_SOURCES)) {
  REGISTRY.set(name, { kind: 'stroke', markup: inner(svg) });
}
for (const [name, icon] of Object.entries(BRAND_SOURCES)) {
  REGISTRY.set(name, { kind: 'fill', path: icon.path });
}

/** All registered icon names (kebab-case). */
export const iconNames: readonly IconName[] = [...REGISTRY.keys()] as IconName[];

/** Look up an icon definition; returns undefined for unknown names. */
export function getIcon(name: string): IconDef | undefined {
  return REGISTRY.get(name);
}
