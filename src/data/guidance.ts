export type Cue = { t: number; text: string };

export const GUIDANCE: Record<string, Cue[]> = {
  // 7-minute mindfulness; light Headspace-like tone
  mindful7: [
    { t: 0,   text: "Welcome. Find a comfy posture. Let your shoulders soften." },
    { t: 6,   text: "If it helps, close your eyes, or lower your gaze." },
    { t: 14,  text: "Take a slow inhale through the nose... and a long gentle exhale." },
    { t: 26,  text: "Let the breath settle into a natural rhythm." },
    { t: 40,  text: "Notice contact points: feet on the floor, body on the seat." },
    { t: 55,  text: "We'll rest attention on the sensation of breathing." },
    // breathing cadence cues (roughly every 20–30s)
    { t: 70,  text: "Inhale four... hold one... exhale six... and soften the jaw." },
    { t: 100, text: "When the mind wanders, gently note 'thinking', and return to the breath." },
    { t: 130, text: "Sense the rise and fall in the chest or the belly." },
    { t: 160, text: "If there's tension, breathe into it, and let it release on the exhale." },
    { t: 190, text: "Allow sounds to come and go. Nothing to fix." },
    { t: 220, text: "Back to the breath. Inhale four... hold one... exhale six." },
    { t: 250, text: "Notice the space around the breath, the pauses between." },
    { t: 280, text: "If you feel sleepy or restless, that's okay. Start again, kindly." },
    { t: 310, text: "Widen attention: body, breath, and sounds—held with ease." },
    { t: 340, text: "One more minute. Inhale four... hold one... exhale six." },
    { t: 380, text: "Gently deepen the breath. Wiggle fingers and toes." },
    { t: 405, text: "When you're ready, open the eyes. Notice how you feel." }
  ],

  // 3-minute calm; brief reset
  calm3: [
    { t: 0,  text: "Let's reset together. Relax the shoulders." },
    { t: 3,  text: "Breathe in through the nose for four... hold one... out for six." },
    { t: 13, text: "Again. In four... hold... out six. Let the belly soften." },
    { t: 25, text: "Notice one place that feels steady—maybe the feet or the seat." },
    { t: 38, text: "If thoughts appear, label them 'thinking', and return to the breath." },
    { t: 50, text: "In four... hold... out six. Imagine exhaling any tightness." },
    { t: 70, text: "Soften the jaw and the muscles around the eyes." },
    { t: 85, text: "One more slow breath. In four... hold... out six." },
    { t: 105, text: "Gently open the eyes. Carry this calm into the next thing." }
  ]
};