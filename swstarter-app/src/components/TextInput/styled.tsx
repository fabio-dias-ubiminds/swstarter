import styled from "styled-components";

export const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px 0 var(--warm-grey-75);
  border: 1px solid var(--pinkish-grey);
  background-color: var(--white);
  &:focus {
    outline: none;
    border: 2px solid var(--emerald);
  }
`;
