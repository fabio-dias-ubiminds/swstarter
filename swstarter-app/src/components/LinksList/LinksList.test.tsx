import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinksList } from "./index";

describe("LinksList", () => {
  test("renders with correct content when type is people", () => {
    render(<LinksList links={[]} type="people" />);
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });

  test("renders with correct content when type is movies", () => {
    render(<LinksList links={[]} type="movies" />);
    expect(screen.getByText("Movies")).toBeInTheDocument();
  });

  test("renders the list correctly when have one item", () => {
    render(<LinksList links={[{ id: 1, name: "Luke Skywalker" }]} type="people" />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.queryByText(",")).not.toBeInTheDocument();
  });

  test("renders the list correctly when have more than one item", () => {
    render(
      <LinksList
        links={[
          { id: 1, name: "Luke Skywalker" },
          { id: 2, name: "Darth Vader" },
        ]}
        type="people"
      />
    );
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
    expect(screen.getByText(",")).toBeInTheDocument();
  });
});
