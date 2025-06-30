import { expect, test, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchResults } from "./index";
import { SearchResultItem } from "@/lib/types";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("../SearchResultsItem", () => ({
  SearchResultsItem: () => <div>item</div>,
}));

const mockResults = [
  { id: 1, label: "Luke Skywalker", type: "people" },
  { id: 2, label: "Darth Vader", type: "people" },
  { id: 3, label: "Yoda", type: "people" },
  { id: 4, label: "Leia Organa", type: "people" },
  { id: 5, label: "Obi-Wan Kenobi", type: "people" },
  { id: 6, label: "Anakin Skywalker", type: "people" },
  { id: 7, label: "Han Solo", type: "people" },
  { id: 8, label: "Chewbacca", type: "people" },
  { id: 9, label: "R2-D2", type: "people" },
  { id: 10, label: "C-3PO", type: "people" },
] as SearchResultItem[];

describe("SearchResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with correct content when have one result", () => {
    render(<SearchResults results={mockResults} />);
    expect(screen.getAllByText(/item/)).toHaveLength(mockResults.length);
  });
});
