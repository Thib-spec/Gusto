import React from "react";
import { useTranslation } from "react-i18next";

/**
 * exemple d'utilisation du module de traduction 
 * visible sur la page login
 */

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div onChange={changeLanguage}>
      <input type="radio" value="en" name="language" /> {t("language.english")}
      <input type="radio" value="fr" name="language" /> {t("language.french")}
    </div>
  );
}
