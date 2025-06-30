import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { OpeningCrawl } from "./index";

describe("OpeningCrawl", () => {
  test("renders with correct content", () => {
    render(<OpeningCrawl openingCrawl="test text" />);
    expect(screen.getByText(/test text/)).toBeInTheDocument();
  });
});
