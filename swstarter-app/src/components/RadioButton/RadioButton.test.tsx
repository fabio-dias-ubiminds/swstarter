import { expect, test, vi, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RadioButton } from "./index";

describe("RadioButton", () => {
  test("renders with correct content", () => {
    render(<RadioButton value="test" onChange={() => {}} checked={false} label="test" />);
    expect(screen.getByRole("radio", { name: "test" })).toBeInTheDocument();
  });

  test("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<RadioButton value="test" onChange={onChange} checked={false} label="test" />);
    fireEvent.click(screen.getByRole("radio", { name: "test" }));
    expect(onChange).toHaveBeenCalledWith("test");
  });

  test("should be checked when checked is true", () => {
    render(<RadioButton value="test" onChange={() => {}} checked={true} label="test" />);
    expect(screen.getByRole("radio", { name: "test" })).toBeChecked();
  });

  test("should not be checked when checked is false", () => {
    render(<RadioButton value="test" onChange={() => {}} checked={false} label="test" />);
    expect(screen.getByRole("radio", { name: "test" })).not.toBeChecked();
  });
});
