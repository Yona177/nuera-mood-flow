export type Meditation = {
  id: string;
  title: string;
  subtitle?: string;
  durationSec: number;
  audioUrl?: string;            // optional: if present, use mp3
  coverUrl?: string;
  tags?: string[];
};

export const MEDITATIONS: Record<string, Meditation> = {
  mindful7: {
    id: "mindful7",
    title: "7-Minute Mindfulness",
    subtitle: "A guided practice to open attention and soften the breath",
    durationSec: 420, // 7 minutes
    audioUrl: "/audio/mindful7.mp3", // PLACEHOLDER. If not available, TTS fallback will run.
    coverUrl: "/images/meditations/mindful5.jpg",
    tags: ["mindfulness","guided"]
  },
  calm3: {
    id: "calm3",
    title: "3-Minute Calm",
    subtitle: "Short guided reset with gentle breathing",
    durationSec: 180, // 3 minutes
    audioUrl: "/audio/calm3.mp3", // PLACEHOLDER. If not available, TTS fallback will run.
    coverUrl: "/images/meditations/calm2.jpg",
    tags: ["calm","guided"]
  }
};