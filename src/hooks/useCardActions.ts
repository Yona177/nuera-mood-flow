import { useNavigate } from "react-router-dom";
import type { Card } from "@/types/card";
import { track } from "@/utils/analytics";

export function useCardActions() {
  const nav = useNavigate();

  function onSwipeRight(card: Card) {
    track("card_swipe", { id: card.id, type: card.type, dir: "right" });

    const action = card.action;
    if (!action) return;

    switch (action.kind) {
      case "open_meditation":
        nav(`/meditation/${action.meditationId}`);
        return;
      case "open_breath":
        // Future: nav(`/breathing/${action.patternId}`);
        return;
      case "open_cbt":
        // Future: nav(`/cbt/${action.tipId}`);
        return;
      case "open_companion":
        // Future: nav("/companion");
        return;
      case "open_sleep":
        // Future: nav(`/sleep/${action.routineId}`);
        return;
      default:
        return;
    }
  }

  function onSwipeLeft(card: Card) {
    track("card_swipe", { id: card.id, type: card.type, dir: "left" });
    // Just skip the card - no action needed
  }

  return { onSwipeRight, onSwipeLeft };
}