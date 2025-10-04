export type Meditation = {
  id: string;
  title: string;
  subtitle?: string;
  durationSec: number;
  audioUrl: string;       // must exist at /public/audio/<file>.mp3
  coverUrl?: string;      // optional image in /public/images/...
  tags?: string[];
};

// NOTE:
// - Make sure the file names below exist in /public/audio/
// - Make sure your swipe card action uses the SAME id (e.g., "calm2")
//   action: { kind: "open_meditation", meditationId: "calm2" }

export const MEDITATIONS: Record<string, Meditation> = {
  calm2: {
    id: "calm2",
    title: "2-Minute Calm",
    subtitle: "Short reset with gentle guidance",
    durationSec: 120,
    audioUrl: "/audio/mindful5.mp3",
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

  // Optional placeholder — currently reusing mindful5 audio.
  // If this confuses testing, comment it out or point to a real 10-min file.
  deep10: {
    id: "deep10",
    title: "10-Minute Deep Focus",
    subtitle: "Extended mindfulness practice",
    durationSec: 600,
    audioUrl: "/audio/mindful5.mp3",      // placeholder
    coverUrl: "/images/meditations/mindful5.jpg", // placeholder
    tags: ["focus", "deep"]
  }
};
