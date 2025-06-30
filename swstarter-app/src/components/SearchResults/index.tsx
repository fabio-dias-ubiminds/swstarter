"use client";

import { SearchResultItem } from "@/lib/types";
import { SearchResultsItem } from "../SearchResultsItem";
import { StyledSearchResultsContainer } from "./styled";
import { useRouter } from "next/navigation";

interface SearchResultsProps {
  results: SearchResultItem[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  const router = useRouter();

  const handleSeeDetails = (item: SearchResultItem) => {
    if (item.type === "people") {
      router.push(`/people/${item.id}`);
    } else {
      router.push(`/movies/${item.id}`);
    }
  };

  return (
    <StyledSearchResultsContainer>
      {results.map((result, index) => (
        <SearchResultsItem key={`search-${index}`} item={result} onSeeDetails={handleSeeDetails} />
      ))}
    </StyledSearchResultsContainer>
  );
};
