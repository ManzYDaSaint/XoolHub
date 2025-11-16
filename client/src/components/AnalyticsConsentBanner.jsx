import { useAnalyticsConsent } from "../context/AnalyticsConsentContext.jsx";

const AnalyticsConsentBanner = () => {
  const { status, grantConsent, denyConsent } = useAnalyticsConsent();

  if (status !== "unknown") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200">
        <p className="text-sm text-slate-700">
          We use optional analytics cookies to understand how XoolHub is used
          and to improve the product. Analytics will remain disabled unless you
          choose “Allow”. You can update this choice later from our privacy
          policy page.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={grantConsent}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Allow analytics
          </button>
          <button
            type="button"
            onClick={denyConsent}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsConsentBanner;


