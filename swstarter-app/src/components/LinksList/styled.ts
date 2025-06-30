import styled from "styled-components";

export const StyledLinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledLink = styled.a`
  color: var(--emerald);
  text-decoration: none;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLinksListContainer = styled.div`
  width: 100%;
`;

export const StyledLinksListContentContainer = styled.div`
  width: 100%;
  margin-top: 5px;
`;
