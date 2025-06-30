"use client";

import { useState } from "react";
import { RadioButton } from "../RadioButton";
import { TextInput } from "../TextInput";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { StyledSearchContainer, StyledSearchContentContainer } from "./styled";

interface SearchProps {
  searchType: string;
  searchTerm: string;
}

export const Search = ({ searchType, searchTerm }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState(searchTerm || "");
  const [type, setType] = useState(searchType || "people");

  const handleSearch = () => {
    router.push(`/?q=${search}&type=${type}`);
  };

  return (
    <StyledSearchContainer>
      <StyledSearchContentContainer>
        <RadioButton value="people" onChange={setType} checked={type === "people"} label="people" />
        <RadioButton value="movies" onChange={setType} checked={type === "movies"} label="movies" />
      </StyledSearchContentContainer>
      <TextInput
        value={search}
        onChange={setSearch}
        placeholder="e.g. Chewbacca, Yoda, Boba Fett"
      />
      <Button label="search" onClick={handleSearch} disabled={search.length === 0} />
    </StyledSearchContainer>
  );
};
