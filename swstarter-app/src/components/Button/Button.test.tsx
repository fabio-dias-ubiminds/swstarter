import { expect, test, vi, beforeEach, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with correct label", () => {
    render(<Button label="test" />);
    expect(screen.getByRole("button", { name: "test" })).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button label="test" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "test" }));
    expect(onClick).toHaveBeenCalled();
  });
});
