import { useTranslation } from "react-i18next";
import type { AlertProps } from "./types";
import { useState } from "react";

export default function Alert(props: AlertProps) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const show = () => {
    if(open) {
      setOpen(false);
      return;
    }
    setOpen(true);
  };

  return (
    <div
      key={props.headline}
      className={`
                  w-full text-left
                  rounded-xl
                  border border-[var(--color-card-border)]
                  border-l-5
                  bg-[var(--color-card-bg)]
                  px-4 py-3
                  shadow-sm
                `}
      style={{
        borderLeftColor: `var(--color-alert-${props.color})`,
      }}
      onClick={show}
    >
      <div className="flex items-start gap-3">
        <div className="text-xl shrink-0 select-none">{props.icon}</div>

        <div className="min-w-0 flex-1">
          <span
            className="
                        text-xs font-semibold
                        px-0 py-0.5 rounded-full
                        bg-[var(--color-secondary-text)]
                        text-[var(--color-secondary-text)]
                      "
          >
            {t(`common.${props.status}`)}
          </span>

          <h3 className="mt-2 font-semibold text-[var(--color-info-text)]">
            {props.headline}
          </h3>

          <p className="mt-1 text-sm text-[var(--color-secondary-text)]">
            {props.alertStartTime} → {props.alertEndTime}
          </p>
        </div>
      </div>
      {open && (props.description || props.instructions) && (
        <div className="flex items-start gap-3">
          <div className="mt-2">
            {props.description ? <p>{props.description}</p> : ""}
            {props.instructions ? (
              <p className="mt-2">{props.instructions}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}
