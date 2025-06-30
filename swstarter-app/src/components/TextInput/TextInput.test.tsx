import { expect, test, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextInput } from "./index";

describe("TextInput", () => {
  test("should render placeholder when provided", () => {
    render(<TextInput value="test" onChange={() => {}} placeholder="test placeholder" />);
    expect(screen.getByPlaceholderText(/test placeholder/)).toBeInTheDocument();
  });

  test("should not render placeholder when not provided", () => {
    render(<TextInput value="test" onChange={() => {}} />);
    expect(screen.queryByPlaceholderText(/test placeholder/)).not.toBeInTheDocument();
  });

  test("should call onChange when input value changes", () => {
    const onChange = vi.fn();
    render(<TextInput value="test" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "new value" } });
    expect(onChange).toHaveBeenCalledWith("new value");
  });
});
