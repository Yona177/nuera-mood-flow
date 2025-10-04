export type CardType =
  | "meditation"
  | "breathing"
  | "cbt"
  | "companion"
  | "sleep"
  | "perspective";

/**
 * Action types
 * - New: `open_breathing` with `breathingId` (preferred going forward)
 * - Legacy: `open_breath` with `patternId` (kept for backward compatibility)
 */
export type CardAction =
  | { kind: "open_meditation"; meditationId: string }
  | { kind: "open_breathing"; breathingId: string }   // NEW, preferred
  | { kind: "open_breath"; patternId: string }        // LEGACY, still supported
  | { kind: "open_cbt"; tipId: string }
  | { kind: "open_companion" }
  | { kind: "open_sleep"; routineId: string }
  | { kind: "none" };

export type Card = {
  id: string;
  type: CardType;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  image?: string;      // compatibility with existing code
  durationSec?: number;
  duration?: string;   // compatibility with existing code
  tags?: string[];
  action?: CardAction;
};
