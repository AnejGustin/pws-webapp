import type { CardProps } from "./types";

export default function Card(props: CardProps) {
  return (
    <div
      className={`
        relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm
        transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300
      `}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
}