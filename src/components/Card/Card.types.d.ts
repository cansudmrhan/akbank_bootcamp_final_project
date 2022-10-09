import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
  title: string;
  icon?: string;
}>;
