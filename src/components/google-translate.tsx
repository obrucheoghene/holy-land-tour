"use client";

import { useEffect } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,fr,de,it,pt,ru,ar,he,zh,ja,ko",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load Google Translate script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-stone-200 p-3">
      <Globe className="w-5 h-5 text-primary-600" />
      <div
        id="google_translate_element"
        className="google-translate-wrapper"
      ></div>

      <style jsx global>{`
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
        }

        .goog-te-gadget .goog-te-combo {
          background-color: transparent !important;
          border: none !important;
          padding: 4px 8px !important;
          font-size: 14px !important;
          font-family: inherit !important;
          color: #44403c !important;
          outline: none !important;
          cursor: pointer !important;
        }

        .goog-te-gadget .goog-te-combo:focus {
          outline: 2px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }

        .goog-te-banner-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        .goog-te-menu-value {
          color: #44403c !important;
        }

        .goog-te-menu-value:before {
          content: "🌐 ";
        }
      `}</style>
    </div>
  );
}
