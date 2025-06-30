import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { PersonDetails } from "./index";

const mockPerson = {
  id: 1,
  name: "Luke Skywalker",
  birthYear: "19BBY",
  gender: "male",
  eyeColor: "blue",
  hairColor: "blond",
  height: 172,
  mass: 77,
  movies: [{ id: 1, title: "A New Hope" }],
};

describe("PersonDetails", () => {
  test("renders with correct labels and values", () => {
    render(<PersonDetails person={mockPerson} />);
    expect(screen.getByText(`Birth Year: ${mockPerson.birthYear}`)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${mockPerson.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Eye Color: ${mockPerson.eyeColor}`)).toBeInTheDocument();
    expect(screen.getByText(`Hair Color: ${mockPerson.hairColor}`)).toBeInTheDocument();
    expect(screen.getByText(`Height: ${mockPerson.height}`)).toBeInTheDocument();
    expect(screen.getByText(`Mass: ${mockPerson.mass}`)).toBeInTheDocument();
  });
});
