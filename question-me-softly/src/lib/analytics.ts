declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(eventName: string, eventData?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  window.umami?.track(eventName, eventData);
}
