const measurementId =
  process.env.REACT_APP_GA_MEASUREMENT_ID || "G-GEMLNLEDTD";

let consentGranted = false;
let scriptAppended = false;

const ensureDataLayer = () => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
};

const injectScript = () => {
  if (
    scriptAppended ||
    typeof document === "undefined" ||
    !measurementId ||
    !consentGranted
  ) {
    return;
  }

  const existing = document.querySelector(
    `script[src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"]`
  );
  if (existing) {
    scriptAppended = true;
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  scriptAppended = true;
};

const initializeGtag = () => {
  if (typeof window === "undefined" || !measurementId || !consentGranted) {
    return;
  }

  ensureDataLayer();

  if (typeof window.gtag !== "function") {
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      transport_type: "beacon",
    });
  }
};

export const applyAnalyticsConsent = (consent) => {
  if (typeof window !== "undefined" && measurementId) {
    window[`ga-disable-${measurementId}`] = !consent;
  }

  consentGranted = Boolean(consent);

  if (!consentGranted) {
    return;
  }

  injectScript();
  initializeGtag();
};

export const hasAnalyticsConsent = () => consentGranted;

export const trackEvent = (eventName, props = {}) => {
  if (!consentGranted) return;
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function" && measurementId) {
    window.gtag("event", eventName, props);
  }

  if (
    window.analytics &&
    typeof window.analytics.track === "function"
  ) {
    window.analytics.track(eventName, props);
  }
};

