"use client";

import { Person, Movie, LinkType } from "@/lib/types";
import { TopicTitle } from "../TopicTitle";
import { getLink } from "@/lib/getLink";
import React from "react";
import { StyledLink, StyledLinksListContainer, StyledLinksListContentContainer } from "./styled";

interface LinksListProps {
  links: Pick<Person, "id" | "name">[] | Pick<Movie, "id" | "title">[];
  type: LinkType;
}

export const LinksList = ({ links, type }: LinksListProps) => {
  return (
    <StyledLinksListContainer>
      <TopicTitle title={type === "people" ? "Characters" : "Movies"} size="md" />
      <StyledLinksListContentContainer>
        {links.map((link, index) => (
          <React.Fragment key={`link-${index}`}>
            <StyledLink href={getLink(link.id, type)}>
              {"title" in link ? link.title : link.name}
            </StyledLink>
            {index < links.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
      </StyledLinksListContentContainer>
    </StyledLinksListContainer>
  );
};
