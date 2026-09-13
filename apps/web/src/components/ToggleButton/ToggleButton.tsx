import type { ToggleButtonProps } from "./type";

export default function ToggleButton(props: ToggleButtonProps) {
  return (
    <button
      className="flex h-10 w-10 text-lg pl-0.5 items-center justify-center rounded-full bg-[var(--color-button-bg)] border border-[var(--color-card-border)]"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
