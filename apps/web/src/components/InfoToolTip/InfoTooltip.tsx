import { useState } from "react";
import type { InfoTooltipProps } from "./types";

export default function InfoTooltip(props: InfoTooltipProps) {
    const [open, setOpen] = useState(false);

    let timeout: number | undefined = undefined;

    const show = () => {
        clearTimeout(timeout);
        setOpen(true);
    };

    const hide = () => {
        timeout = setTimeout(() => setOpen(false), 200);
    };

    return (
        <div className="absolute bottom-4 right-5">
            <button
                onMouseEnter={show}
                onMouseLeave={hide}
                className="w-7 h-7 rounded-full font-bold text-base
                           text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition"
            >
                i
            </button>

            {open && (
                <div
                    onMouseEnter={show}
                    onMouseLeave={hide}
                    className="absolute bottom-full mb-2 right-0 w-80
                               bg-white text-gray-700 text-sm
                               shadow-lg border border-gray-200
                               rounded-xl p-4 z-50 space-y-3"
                >
                    {props.children}
                </div>
            )}
        </div>
    );
}