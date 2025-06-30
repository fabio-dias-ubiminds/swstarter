import styled from "styled-components";

export const StyledButton = styled.button`
  text-transform: uppercase;
  text-wrap: nowrap;
  width: auto;
  height: 34px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--white);
  padding: 8px 20px;
  border-radius: 20px;
  border: solid 1px var(--green-teal);
  background-color: var(--green-teal);
  color: var(--white);
  cursor: pointer;
  transition: background-color 200ms ease;
  &:hover {
    background-color: var(--emerald);
  }
  &:disabled {
    border: solid 1px var(--pinkish-grey);
    background-color: var(--pinkish-grey);
    cursor: not-allowed;
  }
`;
