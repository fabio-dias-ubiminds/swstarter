import { expect, test, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchResultsItem } from "./index";
import { SearchResultItem } from "@/lib/types";

const mockOnSeeDetails = vi.fn();

const mockSearchResultItem = {
  id: 1,
  label: "Luke Skywalker",
  type: "people",
} as SearchResultItem;

describe("SearchResultsItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with correct content", () => {
    render(
      <SearchResultsItem
        item={{ id: 1, label: "Luke Skywalker", type: "people" }}
        onSeeDetails={mockOnSeeDetails}
      />
    );
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "see details" })).toBeInTheDocument();
  });

  test("calls onSeeDetails when button is clicked", () => {
    render(<SearchResultsItem item={mockSearchResultItem} onSeeDetails={mockOnSeeDetails} />);
    fireEvent.click(screen.getByRole("button", { name: "see details" }));
    expect(mockOnSeeDetails).toHaveBeenCalledWith(mockSearchResultItem);
  });
});
