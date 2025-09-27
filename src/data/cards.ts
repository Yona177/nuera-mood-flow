import { type Card } from "@/types/card";
import meditationCard from '@/assets/meditation-card.png';
import breathingCard from '@/assets/breathing-card.png';
import journalCard from '@/assets/journal-card.png';

export const SEED_CARDS: Card[] = [
  {
    id: "card_mindful7",
    type: "meditation",
    title: "7-Minute Mindfulness",
    subtitle: "Guided attention + soft breathing",
    content: "A guided practice to open attention and soften the breath with gentle voice instruction.",
    imageUrl: meditationCard,
    image: meditationCard, // Keep compatibility
    durationSec: 420,
    duration: "7 min", // Keep compatibility
    action: { kind: "open_meditation", meditationId: "mindful7" }
  },
  {
    id: "card_calm3",
    type: "meditation", 
    title: "3-Minute Calm",
    subtitle: "A brief guided reset",
    content: "Short guided reset with gentle breathing instructions to help you find calm quickly.",
    imageUrl: meditationCard,
    image: meditationCard,
    durationSec: 180,
    duration: "3 min",
    action: { kind: "open_meditation", meditationId: "calm3" }
  },
  {
    id: "card_breathing",
    type: "breathing",
    title: "Box Breathing",
    content: "Try this simple breathing technique: Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat to find your calm.",
    imageUrl: breathingCard,
    image: breathingCard,
    durationSec: 180,
    duration: "3 min",
    action: { kind: "none" }
  },
  {
    id: "card_journal",
    type: "perspective",
    title: "Gratitude Reflection", 
    content: "What are three things you're grateful for today? Write them down and reflect on why they matter to you.",
    imageUrl: journalCard,
    image: journalCard,
    durationSec: 120,
    duration: "2 min",
    action: { kind: "none" }
  },
  {
    id: "card_companion",
    type: "companion",
    title: "AI Companion Chat",
    content: "I'm here to listen and support you. What's on your mind today? Share your thoughts and feelings in a safe space.",
    duration: "Open",
    action: { kind: "open_companion" }
  }
];