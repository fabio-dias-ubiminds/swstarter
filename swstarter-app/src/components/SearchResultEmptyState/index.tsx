"use client";

import { StyledSearchResultEmptyState, StyledSearchResultEmptyStateContainer } from "./styled";

interface SearchResultEmptyStateProps {
  isFetching?: boolean;
}

export const SearchResultEmptyState = ({ isFetching }: SearchResultEmptyStateProps) => {
  if (isFetching) {
    return (
      <StyledSearchResultEmptyStateContainer>
        <StyledSearchResultEmptyState>Searching...</StyledSearchResultEmptyState>
      </StyledSearchResultEmptyStateContainer>
    );
  }

  return (
    <StyledSearchResultEmptyStateContainer>
      <StyledSearchResultEmptyState>There are zero matches.</StyledSearchResultEmptyState>
      <StyledSearchResultEmptyState>
        Use the form to search for People or Movies.
      </StyledSearchResultEmptyState>
    </StyledSearchResultEmptyStateContainer>
  );
};
