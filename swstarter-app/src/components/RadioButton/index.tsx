"use client";

import { StyledLabel, StyledRadioButton, StyledRadioButtonContainer } from "./styled";

interface RadioButtonProps {
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
  label?: string;
}

export const RadioButton = ({ value, onChange, checked, label }: RadioButtonProps) => {
  return (
    <StyledRadioButtonContainer onClick={() => onChange(value)}>
      <StyledRadioButton
        name={label}
        type="radio"
        value={value}
        checked={checked}
        id={value}
        onChange={() => onChange(value)}
      />
      {label && <StyledLabel htmlFor={value}>{label}</StyledLabel>}
    </StyledRadioButtonContainer>
  );
};
