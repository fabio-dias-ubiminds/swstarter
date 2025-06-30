import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./index";

describe("Header", () => {
  test("renders with correct content", () => {
    render(<Header />);
    expect(screen.getByText("SWStarter")).toBeInTheDocument();
  });
});
