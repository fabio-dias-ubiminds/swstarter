"use client";

import { SearchResultItem } from "@/lib/types";
import { Button } from "../Button";
import { StyledSearchItemContainer, StyledSearchItemTitle } from "./styled";

interface SearchResultsItemProps {
  item: SearchResultItem;
  onSeeDetails: (item: SearchResultItem) => void;
}

export const SearchResultsItem = ({ item, onSeeDetails }: SearchResultsItemProps) => {
  return (
    <StyledSearchItemContainer>
      <StyledSearchItemTitle>{item.label}</StyledSearchItemTitle>
      <Button label="see details" onClick={() => onSeeDetails(item)} />
    </StyledSearchItemContainer>
  );
};
