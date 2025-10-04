export type BreathingPhase = "inhale" | "hold" | "exhale" | "hold2";

export type BreathingPattern = {
  id: string;
  title: string;
  subtitle?: string;
  // phase durations in seconds
  cycle: { inhale: number; hold: number; exhale: number; hold2: number };
  // default session length (seconds)
  sessionSec: number;
  // visual options
  minScale?: number; // 1.0 = base size
  maxScale?: number; // how large on inhale (e.g., 1.35)
};

export const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  box44: {
    id: "box44",
    title: "Box Breathing",
    subtitle: "Inhale 4 • Hold 4 • Exhale 4 • Hold 4",
    cycle: { inhale: 4, hold: 4, exhale: 4, hold2: 4 },
    sessionSec: 180, // 3 minutes
    minScale: 0.9,
    maxScale: 1.35
  }
};
