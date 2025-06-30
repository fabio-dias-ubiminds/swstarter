export type Person = {
  id: number;
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  height: number;
  mass: number;
  movies: Pick<Movie, "id" | "title">[];
};

export type Movie = {
  id: number;
  title: string;
  openingCrawl: string;
  characters: Pick<Person, "id" | "name">[];
};

export type SearchResultItem = {
  id: number;
  label: string;
  type: LinkType;
};

export type LinkType = "people" | "movies";
