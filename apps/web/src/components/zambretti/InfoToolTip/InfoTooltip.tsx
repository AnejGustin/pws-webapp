import { useState } from "react";

export default function InfoTooltip() {
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
                    <p>
                        This forecast is a short-term atmospheric tendency prediction valid for up to 12 hours ahead, and up to 24 hours under stable conditions.
                    </p>

                    <p>
                        It is based on a modified Zambretti algorithm that uses barometric pressure trends as the primary driver. Wind direction, wind speed, and seasonal context are included as secondary factors with limited influence on the final outcome.
                    </p>

                    <p>
                        This model is calibrated for Slovenian weather patterns and is intended for trend indication rather than precise meteorological forecasting.
                    </p>

                    <a
                        href="https://github.com/AnejGustin/pws-webapp#zambretti-algorithm"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        More details
                    </a>

                </div>
            )}
        </div>
    );
}