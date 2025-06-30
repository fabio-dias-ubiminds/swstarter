import styled from "styled-components";

export const StyledRadioButton = styled.input`
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  padding: 6px;
  background-color: var(--white);
  border-radius: 50%;
  border: 1px solid var(--pinkish-grey);
  cursor: pointer;
  position: relative;

  &:hover {
    border: 1px solid var(--emerald);
  }

  &:checked {
    background-color: var(--emerald);
    border: 1px solid var(--emerald);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(10, 180, 99, 0.2);
  }
`;

export const StyledLabel = styled.label`
  cursor: pointer;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--black);
`;

export const StyledRadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
