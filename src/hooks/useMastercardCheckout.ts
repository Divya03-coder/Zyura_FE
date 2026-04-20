import { useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Checkout: any;
    onError: (error: any) => void;
    onCancel: () => void;
    onComplete: (resultIndicator: string, sessionVersion: string) => void;
  }
}

export const useMastercardCheckout = () => {
  // const navigate = useNavigate();

  // Initialize script and callbacks
  useEffect(() => {
    // Define global callbacks that the script expects via data-attributes
    window.onError = (error: any) => {
      console.error("Payment error:", error);
    };

    window.onCancel = () => {
      console.log("Payment cancelled");
    };

    // Note: onComplete logic depends on specific checkout flow (see startCheckout)
  }, []);

  const loadScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.Checkout) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://afs.gateway.mastercard.com/static/checkout/checkout.min.js";
      script.setAttribute("data-error", "onError");
      script.setAttribute("data-cancel", "onCancel");
      script.setAttribute("data-complete", "onComplete");

      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load payment script"));

      document.head.appendChild(script);
    });
  }, []);

  const startCheckout = useCallback(
    async (sessionId: string) => {
      try {
        await loadScript();

        // Define onComplete specifically for this checkout attempt context if needed,
        // or just use valid global that redirects
        window.onComplete = (resultIndicator: string) => {
          console.log("Payment completed. Result Indicator:", resultIndicator);
          // Redirect to success URL with resultIndicator
          // Append resultIndicator to existing params or add query string
          // const separator = successUrl.includes("?") ? "&" : "?";
          // window.location.href = `${successUrl}${separator}resultIndicator=${resultIndicator}`;
        };

        if (window.Checkout) {
          window.Checkout.configure({
            session: {
              id: sessionId,
            },
          });

          window.Checkout.showPaymentPage();
        } else {
          console.error("Checkout object not found on window");
        }
      } catch (error) {
        console.error("Error starting checkout:", error);
      }
    },
    [loadScript]
  );

  return { startCheckout };
};
