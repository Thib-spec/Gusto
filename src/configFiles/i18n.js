import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/**
 * fichier de configuration du module i18n (module d'internationalisation)
 * voir https://i18nexus.com/ pour plus d'informations
 */

const loadPath = "/locales/{{lng}}/{{ns}}.json"; // can be an URL

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    backend: {
      /* translation file path */
      loadPath
    },
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ["default","common","validation"],
    defaultNS: "common",
    lng: "en",
    supportedLngs: ["en","fr"],
    debug: true,
    // keySeparator: false,
    // interpolation: {
    //   escapeValue: false,
    //   formatSeparator: ",",
    // },
    // react: {
    //   wait: true,
    // },
  });

export default i18n;
