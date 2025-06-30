import { expect, test, vi, beforeEach, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Search } from "./index";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with correct content", () => {
    render(<Search searchType="people" searchTerm="test" />);
    expect(screen.getByText("people")).toBeInTheDocument();
    expect(screen.getByText("movies")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. Chewbacca, Yoda, Boba Fett")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "search" })).toBeInTheDocument();
  });

  test("calls handleSearch when button is clicked", () => {
    render(<Search searchType="movies" searchTerm="test" />);
    fireEvent.click(screen.getByRole("button", { name: "search" }));

    expect(screen.getByRole("textbox")).toHaveValue("test");
    expect(screen.getByRole("radio", { name: "movies" })).toBeChecked();
    expect(mockPush).toHaveBeenCalledWith("/?q=test&type=movies");
  });
});
