import styled from "styled-components";

export const StyledOpeningCrawl = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--black);
  white-space: pre-wrap; // it's necessary to preserve newlines and breaks from the backend response
`;

export const StyledOpeningCrawlContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden; // it's necessary to show the scrollbar when the content is too long
`;

export const StyledParagraphContainer = styled.div`
  margin-top: 5px;
  overflow-y: auto;
`;
