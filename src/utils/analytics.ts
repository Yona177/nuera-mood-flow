// src/utils/analytics.ts

// Toggle verbose console logging in dev
const DEBUG = import.meta.env.DEV || localStorage.getItem("nuera:analytics:debug") === "1";

type Payload = Record<string, unknown>;

type Transport = {
  name: string;
  send: (event: string, props?: Payload) => void;
};

// --- Transports (add real providers here later) ---
const consoleTransport: Transport = {
  name: "console",
  send: (event, props) => {
    // Only log in dev / when debug flag is on
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.log(`[analytics] ${event}`, props || {});
    }
  },
};

// Example placeholder for future providers:
// const posthogTransport: Transport = {
//   name: "posthog",
//   send: (event, props) => window.posthog?.capture?.(event, props);
// };

// Register transports here
const transports: Transport[] = [consoleTransport];

// Public API
export function track(event: string, props?: Payload) {
  try {
    transports.forEach(t => t.send(event, props));
  } catch (e) {
    // swallow analytics errors
  }
}

export function setUser(identity: { id?: string; email?: string; name?: string } = {}) {
  track("$identify", identity);
}

export function page(path?: string) {
  track("$pageview", { path: path || window.location.pathname });
}

// Optional: enable debug at runtime
export function enableAnalyticsDebug() {
  localStorage.setItem("nuera:analytics:debug", "1");
}
export function disableAnalyticsDebug() {
  localStorage.removeItem("nuera:analytics:debug");
}
