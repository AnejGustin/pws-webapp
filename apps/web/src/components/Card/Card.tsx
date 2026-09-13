import type { CardProps } from "./types";

export default function Card(props: CardProps) {
  return (
    <div
      className={`
        relative text-[var(--color-primary-card-text)] bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-5 shadow-sm
        transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5
      `}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
}