export type Meditation = {
  id: string;
  title: string;
  subtitle?: string;
  durationSec: number;
  audioUrl: string;
  coverUrl?: string;
  tags?: string[];
};

export const MEDITATIONS: Record<string, Meditation> = {
  calm2: {
    id: "calm2",
    title: "2-Minute Calm",
    subtitle: "Short reset with gentle guidance",
    durationSec: 120,
    audioUrl: "/audio/calm2.mp3",
    coverUrl: "/images/meditations/calm2.jpg",
    tags: ["calm", "reset"]
  },
  mindful5: {
    id: "mindful5", 
    title: "5-Minute Mindfulness",
    subtitle: "Center yourself and breathe",
    durationSec: 300,
    audioUrl: "/audio/mindful5.mp3",
    coverUrl: "/images/meditations/mindful5.jpg",
    tags: ["mindfulness"]
  },
  deep10: {
    id: "deep10",
    title: "10-Minute Deep Focus",
    subtitle: "Extended mindfulness practice", 
    durationSec: 600,
    audioUrl: "/audio/mindful5.mp3", // Reuse existing audio placeholder
    coverUrl: "/images/meditations/mindful5.jpg", // Reuse existing image
    tags: ["focus", "deep"]
  }
};