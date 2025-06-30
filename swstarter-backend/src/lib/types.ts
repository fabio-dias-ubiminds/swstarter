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

export type SwApiPerson = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type SwApiFilm = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export interface CacheOptions {
  ttl?: number;
  key?: string;
}

export interface JobData {
  type: string;
  payload: any;
  timestamp: number;
}
