import { useState } from "react";
import type { SideElementProps } from "./types";

export default function SideElement(props: SideElementProps) {
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
    <div onMouseEnter={show} onMouseLeave={hide} className="relative">
      <p className="text-xs text-[var(--color-secondary-card-text)]">{props.parameter}</p>
      <p className="text-sm font-medium text-[var(--color-primary-card-text)]">
        {props.value === undefined || props.value === null
          ? "-"
          : props.description != undefined
            ? `${props.value} ${props.description}`
            : props.value}{" "}
        {props.unit}
      </p>
      {open && props.hoverContent && (
        <div
          onMouseEnter={show}
          onMouseLeave={hide}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max
                               bg-[var(--color-card-bg)] text-[var(--color-info-text)] text-sm
                               shadow-lg border border-[var(--color-card-border)]
                               rounded-xl p-4 z-50 space-y-2"
        >
          {props.hoverContent}
        </div>
      )}
    </div>
  );
}
