import styled from "styled-components";

export const StyledTitleLg = styled.h2`
  width: 100%;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--black);
  border-bottom: 1px solid var(--pinkish-grey);
`;

export const StyledTitleLgNoBorder = styled(StyledTitleLg)`
  border-bottom: none;
`;

export const StyledTitleMd = styled.h3`
  width: 100%;
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--black);
  border-bottom: 1px solid var(--pinkish-grey);
`;

export const StyledTitleMdNoBorder = styled(StyledTitleMd)`
  border-bottom: none;
`;

export const StyledTitleSm = styled.h4`
  width: 100%;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--foreground);
`;
