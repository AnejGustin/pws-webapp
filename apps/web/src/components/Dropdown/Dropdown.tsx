import { useState } from "react";
import type { DropdownProps } from "./types";

export default function Dropdown(props: DropdownProps) {
    const [open, setOpen] = useState(false);

    return !props.hide && (
        <div className="relative w-48">

            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
                <span className="text-gray-700">
                    {
                        props.formatDisplay != undefined
                            ? props.formatDisplay(props.value)
                            : props.value
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
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">

                    {props.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                props.onChange(option);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition ${option === props.value
                                ? "bg-gray-100 text-gray-900 font-medium"
                                : "text-gray-600"
                                }`}
                        >
                            {
                                props.formatDisplay != undefined
                                    ? props.formatDisplay(option)
                                    : option
                            }
                        </button>
                    ))}

                </div>
            )}

        </div>
    );
}