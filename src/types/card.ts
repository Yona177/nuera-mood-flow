export type CardType = "meditation" | "breathing" | "cbt" | "companion" | "sleep" | "perspective";

export type CardAction =
  | { kind: "open_meditation"; meditationId: string }
  | { kind: "open_breath"; patternId: string }
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
  image?: string; // Keep compatibility with existing code
  durationSec?: number;
  duration?: string; // Keep compatibility with existing code
  tags?: string[];
  action?: CardAction;
};