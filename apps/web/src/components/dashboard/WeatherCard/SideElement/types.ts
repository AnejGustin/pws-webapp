import type { ReactNode } from "react";

export type SideElementProps = {
    parameter: string,
    value: string | number | null | undefined,
    unit?: string,
    hoverContent?: ReactNode | Array<ReactNode>,
}