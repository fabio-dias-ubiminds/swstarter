"use client";

import { StyledButton } from "./styled";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
};
