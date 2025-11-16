import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { applyAnalyticsConsent } from "../utils/analytics";

const STORAGE_KEY = "xoolhub.analyticsConsent";

const AnalyticsConsentContext = createContext({
  status: "unknown",
  grantConsent: () => {},
  denyConsent: () => {},
});

export const AnalyticsConsentProvider = ({ children }) => {
  const [status, setStatus] = useState("unknown");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);
      if (storedValue === "granted" || storedValue === "denied") {
        setStatus(storedValue);
        applyAnalyticsConsent(storedValue === "granted");
      }
    } catch (_) {
      // Ignore storage errors (e.g., private mode)
    }
  }, []);

  const persistStatus = useCallback((nextStatus) => {
    setStatus(nextStatus);
    applyAnalyticsConsent(nextStatus === "granted");

    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextStatus);
    } catch (_) {
      // Ignore storage errors
    }
  }, []);

  const grantConsent = useCallback(() => {
    persistStatus("granted");
  }, [persistStatus]);

  const denyConsent = useCallback(() => {
    persistStatus("denied");
  }, [persistStatus]);

  const value = useMemo(
    () => ({
      status,
      grantConsent,
      denyConsent,
    }),
    [status, grantConsent, denyConsent]
  );

  return (
    <AnalyticsConsentContext.Provider value={value}>
      {children}
    </AnalyticsConsentContext.Provider>
  );
};

export const useAnalyticsConsent = () => useContext(AnalyticsConsentContext);


