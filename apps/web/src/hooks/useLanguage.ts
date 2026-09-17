import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function useLanguage() {
    const { i18n } = useTranslation();

    const [language, setLanguage] = useState("");
    const languageDisplay = language === "en-GB" ? "🇬🇧" : "🇸🇮";

    function setToEnglish() {
        setLanguage("en-GB");
        i18n.changeLanguage("en-GB");
    }

    function setToSlovenian() {
        setLanguage("sl");
        i18n.changeLanguage("sl");
    }

    const changeLanguage = () => {
        if (language === "sl") {
            setToEnglish();
            localStorage.setItem("language", "en-GB");
        } else {
            setToSlovenian();
            localStorage.setItem("language", "sl");
        }
    }

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");

        if (savedLanguage === null) {
            setToEnglish();
            localStorage.setItem("language", "en-GB");
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