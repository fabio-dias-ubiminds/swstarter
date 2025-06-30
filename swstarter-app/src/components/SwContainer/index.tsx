"use client";

import { StyledSwContainer } from "./styled";

export const SwContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLDivElement>) => {
  return <StyledSwContainer {...props}>{children}</StyledSwContainer>;
};
