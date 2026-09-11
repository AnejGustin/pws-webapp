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
    <div 
        onMouseEnter={show} 
        onMouseLeave={hide}
        className="relative"
    >
      <p className="text-xs text-gray-500">{props.parameter}</p>
      <p className="text-sm font-medium text-gray-800">
        {props.value === undefined || props.value === null ? "-" : props.value}{" "}
        {props.unit}
      </p>
      {open && props.hoverContent && (
        <div
          onMouseEnter={show}
          onMouseLeave={hide}
          className="absolute bottom-full mb-2 right-0 w-auto
                               bg-white text-gray-700 text-sm
                               shadow-lg border border-gray-200
                               rounded-xl p-4 z-50 space-y-2"
        >
          {props.hoverContent}
        </div>
      )}
    </div>
  );
}
