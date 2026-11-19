import { Cctv, Warehouse, KeyRound, BellRing, Siren, Blocks } from "lucide-react";

export const serviceIcons = {
  cctv: Cctv,
  gates: Warehouse, // Warehouse funciona muy bien visualmente como un portón amplio/garaje
  locks: KeyRound,
  alarms: BellRing,
  beacons: Siren,
  other: Blocks,
} as const;

export type ServiceIconId = keyof typeof serviceIcons;