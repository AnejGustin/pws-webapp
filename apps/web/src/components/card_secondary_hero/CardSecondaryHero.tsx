import type { CardSecondaryHeroProps } from "./type";

export default function CardSecondaryHero(props: CardSecondaryHeroProps) {
  let val;
  if (props.value === null || props.value === undefined) {
    val = "-";
  } else {
    val = props.value;
  }

  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-900">
        {val} {props.unit}
      </p>
      <p className="text-xs text-gray-500">{props.description}</p>
    </div>
  );
}
