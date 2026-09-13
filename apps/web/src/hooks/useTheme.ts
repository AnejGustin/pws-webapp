import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState("");
    const themeDisplay = theme === "dark" ? "🌙" : "☀️";

    function setToLight() {
        setTheme("light");
        document.documentElement.classList.remove("dark");
    }

    function setToDark() {
        setTheme("dark");
        document.documentElement.classList.add("dark");
    }

    const changeTheme = () => {
        if (theme === "dark") {
            setToLight();
            localStorage.setItem("theme", "light");
        } else {
            setToDark();
            localStorage.setItem("theme", "dark");
        }
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === null) {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

            if (prefersDark) {
                setToDark();
                localStorage.setItem("theme", "dark");
            } else {
                setToLight();
                localStorage.setItem("theme", "light");
            }
            return;
        }

        if (savedTheme === "dark") {
            setToDark();
        } else {
            setToLight();
        }
    }, [])

    return ({
        changeTheme,
        themeDisplay,
    })
}