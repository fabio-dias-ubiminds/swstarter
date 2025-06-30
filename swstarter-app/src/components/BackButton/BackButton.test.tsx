import { expect, test, vi, beforeEach, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BackButton } from "./index";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("../Button", () => ({
  Button: ({ label, onClick }: { label: string; onClick?: () => void }) => (
    <button onClick={onClick}>{label}</button>
  ),
}));

describe("BackButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with correct label", () => {
    render(<BackButton />);
    expect(screen.getByRole("button", { name: "back to search" })).toBeInTheDocument();
  });

  test("calls router.push with '/' when clicked", () => {
    render(<BackButton />);
    fireEvent.click(screen.getByRole("button", { name: "back to search" }));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
