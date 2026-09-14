import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function useLanguage() {
    const { i18n } = useTranslation();

    const [language, setLanguage] = useState("");
    const languageDisplay = language === "en" ? "🇬🇧" : "🇸🇮";

    function setToEnglish() {
        setLanguage("en");
        i18n.changeLanguage("en");
    }

    function setToSlovenian() {
        setLanguage("sl");
        i18n.changeLanguage("sl");
    }

    const changeLanguage = () => {
        if (language === "sl") {
            setToEnglish();
            localStorage.setItem("language", "en");
        } else {
            setToSlovenian();
            localStorage.setItem("language", "sl");
        }
    }

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");

        if (savedLanguage === null) {
            setToEnglish();
            localStorage.setItem("language", "en");
            return;
        }

        if (savedLanguage === "sl") {
            setToSlovenian();
        } else {
            setToEnglish();
        }
    }, [])

    return ({
        changeLanguage: changeLanguage,
        languageDisplay: languageDisplay,
    })
}