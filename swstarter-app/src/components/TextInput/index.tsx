"use client";

import { StyledInput } from "./styled";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextInput = ({ value, onChange, placeholder }: TextInputProps) => {
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};
