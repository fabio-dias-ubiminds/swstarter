"use client";

import { TopicTitle } from "../TopicTitle";
import {
  StyledOpeningCrawl,
  StyledOpeningCrawlContainer,
  StyledParagraphContainer,
} from "./styled";

interface OpeningCrawlProps {
  openingCrawl: string;
}

export const OpeningCrawl = ({ openingCrawl }: OpeningCrawlProps) => {
  return (
    <StyledOpeningCrawlContainer>
      <TopicTitle title="Opening Crawl" size="md" />
      <StyledParagraphContainer>
        <StyledOpeningCrawl>{openingCrawl}</StyledOpeningCrawl>
      </StyledParagraphContainer>
    </StyledOpeningCrawlContainer>
  );
};
