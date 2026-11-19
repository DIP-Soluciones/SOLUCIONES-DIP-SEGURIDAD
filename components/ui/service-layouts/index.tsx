import { ShowcaseLayout } from "./ShowcaseLayout";
import { CollageLayout } from "./CollageLayout";

export const serviceLayouts = {
  showcase: ShowcaseLayout,
  collage: CollageLayout,
};

export type LayoutKey = keyof typeof serviceLayouts;