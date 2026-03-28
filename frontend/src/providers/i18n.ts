import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "./translation";
import detector from "i18next-browser-languagedetector"; // For auto detecting the user language: https://github.com/i18next/i18next-browser-languageDetector

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .use(detector) // Use the language detector plugin
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translation,
    fallbackLng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    supportedLngs: ["en", "th"],
  });

export default i18n;
