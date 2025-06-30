"use client";

import {
  StyledTitleLg,
  StyledTitleLgNoBorder,
  StyledTitleMd,
  StyledTitleMdNoBorder,
  StyledTitleSm,
} from "./styled";

interface TopicTitleProps {
  title: string;
  size?: "sm" | "md" | "lg";
  noBorder?: boolean;
}

export const TopicTitle = ({ title, size = "sm", noBorder = false }: TopicTitleProps) => {
  if (noBorder) {
    return (
      <>
        {size === "lg" ? (
          <StyledTitleLgNoBorder>{title}</StyledTitleLgNoBorder>
        ) : size === "md" ? (
          <StyledTitleMdNoBorder>{title}</StyledTitleMdNoBorder>
        ) : (
          <StyledTitleSm>{title}</StyledTitleSm>
        )}
      </>
    );
  }

  return (
    <>
      {size === "lg" ? (
        <StyledTitleLg>{title}</StyledTitleLg>
      ) : size === "md" ? (
        <StyledTitleMd>{title}</StyledTitleMd>
      ) : (
        <StyledTitleSm>{title}</StyledTitleSm>
      )}
    </>
  );
};
