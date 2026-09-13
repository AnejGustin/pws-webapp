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
      <p className="text-lg font-semibold text-[var(--color-primary-card-text)] tracking-tight">
        {val} {props.unit}
      </p>
      <p className="text-xs text-[var(--color-secondary-card-text)]">{props.description}</p>
    </div>
  );
}
