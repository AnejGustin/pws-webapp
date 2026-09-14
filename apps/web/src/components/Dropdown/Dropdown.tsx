import { useState } from "react";
import type { DropdownProps } from "./types";
import { useTranslation } from "react-i18next";

export default function Dropdown(props: DropdownProps) {
    const [open, setOpen] = useState(false);

    const { t } = useTranslation();

    let selectedParameter;
    if(props.formatDisplay != undefined) {
        selectedParameter = props.formatDisplay(props.value);
    } else {
        selectedParameter = props.value;
    }

    return !props.hide && (
        <div className="relative w-48">

            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl shadow-sm hover:shadow-md transition"
            >
                <span className="text-[var(--color-info-text)]">
                    {
                        props.translate ? t(`dropdowns.${selectedParameter}`) : selectedParameter
                    }
                </span>

                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {open && (
                <div className="absolute mt-2 w-full bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl shadow-lg z-10 overflow-hidden">

                    {props.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                props.onChange(option);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition ${option === props.value
                                ? "bg-gray-100 text-[var(--color-primary-card-text)] font-medium dark:bg-gray-700"
                                : "text-gray-600 dark:text-white"
                                }`}
                        >
                            {
                                props.formatDisplay != undefined
                                    ? props.translate ? t(`dropdowns.${props.formatDisplay(option)}`) : props.formatDisplay(option)
                                    : props.translate ? t(`dropdowns.${option}`) : option
                            }
                        </button>
                    ))}

                </div>
            )}

        </div>
    );
}