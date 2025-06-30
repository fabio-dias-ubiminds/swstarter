"use client";

import { Person } from "@/lib/types";
import { TopicTitle } from "../TopicTitle";
import {
  StyledPersonDetail,
  StyledPersonDetailsContainer,
  StyledPersonDetailsContentContainer,
} from "./styled";

interface PersonDetailsProps {
  person: Person;
}

export const PersonDetails = ({ person }: PersonDetailsProps) => {
  return (
    <StyledPersonDetailsContainer>
      <TopicTitle title="Details" size="md" />
      <StyledPersonDetailsContentContainer>
        <StyledPersonDetail>Birth Year: {person.birthYear}</StyledPersonDetail>
        <StyledPersonDetail>Gender: {person.gender}</StyledPersonDetail>
        <StyledPersonDetail>Eye Color: {person.eyeColor}</StyledPersonDetail>
        <StyledPersonDetail>Hair Color: {person.hairColor}</StyledPersonDetail>
        <StyledPersonDetail>Height: {person.height}</StyledPersonDetail>
        <StyledPersonDetail>Mass: {person.mass}</StyledPersonDetail>
      </StyledPersonDetailsContentContainer>
    </StyledPersonDetailsContainer>
  );
};
