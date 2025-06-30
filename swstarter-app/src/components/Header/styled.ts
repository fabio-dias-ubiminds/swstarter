import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 14px;
  box-shadow: 0 2px 0 0 var(--warm-grey-75);
  background-color: var(--white);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const StyledHeaderTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--green-teal);
`;
