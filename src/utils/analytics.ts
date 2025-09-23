export function track(event: string, props?: Record<string, unknown>) {
  // Replace with your analytics provider later (Mixpanel, Segment, etc.)
  if (import.meta.env.DEV) {
    console.debug("[Analytics]", event, props ?? {});
  }
  
  // For production, you might want to send to your analytics service:
  // analytics.track(event, props);
}