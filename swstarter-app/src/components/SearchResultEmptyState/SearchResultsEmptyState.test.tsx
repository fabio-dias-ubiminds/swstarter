import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchResultEmptyState } from "./index";

describe("SearchResultEmptyState", () => {
  test("renders with correct content when isFetching is false", () => {
    render(<SearchResultEmptyState isFetching={false} />);
    expect(screen.getByText(/There are zero matches./)).toBeInTheDocument();
    expect(screen.getByText(/Use the form to search for People or Movies./)).toBeInTheDocument();
  });

  test("renders with correct content when isFetching is true", () => {
    render(<SearchResultEmptyState isFetching={true} />);
    expect(screen.getByText(/Searching.../)).toBeInTheDocument();
  });
});
