import { 
  Gauge, 
  Zap, 
  BatteryCharging, 
  Radio, 
  SlidersHorizontal, 
  Ruler, 
  Palette, 
  Volume2, 
  Sparkles, 
  Moon, 
  Check,
  ShieldCheck,
  Eye,
  Bell,
  Wifi,
  Cpu,
  Sliders,
  LucideIcon
} from "lucide-react";

export const featureIcons = {
  speed: Gauge,
  power: Zap,
  battery: BatteryCharging,
  remote: Radio,
  controller: SlidersHorizontal,
  rack: Ruler,
  color: Palette,
  sound: Volume2,
  sparkles: Sparkles,
  moon: Moon,
  check: Check,
  shield: ShieldCheck,
  eye: Eye,
  bell: Bell,
  wifi: Wifi,
  cpu: Cpu,
  sliders: Sliders,
} as const;

export type FeatureIconId = keyof typeof featureIcons;