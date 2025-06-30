import { config } from "../config/env";
import { LinkType, Movie, Person, SearchResultItem, SwApiFilm, SwApiPerson } from "../lib/types";
import { ISwService } from "./ISwApiService";
import { cacheService } from "./cacheService";

export class SwApiService implements ISwService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.swapiBaseUrl;
  }

  private async getPeople(): Promise<SwApiPerson[]> {
    const cacheKey = cacheService.generateKey("swapi", "people");
    const cached = await cacheService.get<SwApiPerson[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(`${this.baseUrl}/people`);
    const data = (await response.json()) as SwApiPerson[];

    await cacheService.set(cacheKey, data, 3600);

    return data;
  }

  private async getMovies(): Promise<SwApiFilm[]> {
    const cacheKey = cacheService.generateKey("swapi", "movies");
    const cached = await cacheService.get<SwApiFilm[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(`${this.baseUrl}/films`);
    const data = (await response.json()) as SwApiFilm[];

    // Cache for 1 hour (3600 seconds)
    await cacheService.set(cacheKey, data, 3600);

    return data;
  }

  private async getAll(type: LinkType): Promise<SearchResultItem[]> {
    if (type === "people") {
      const people = await this.getPeople();
      return people.map((person) => ({
        id: Number(person.url.split("/").pop()),
        label: person.name,
        type: "people",
      }));
    } else if (type === "movies") {
      const movies = await this.getMovies();
      return movies.map((movie) => ({
        id: Number(movie.url.split("/").pop()),
        label: movie.title,
        type: "movies",
      }));
    } else {
      throw new Error("Invalid type");
    }
  }

  async search(type: LinkType, term: string): Promise<SearchResultItem[]> {
    const cacheKey = cacheService.generateKey("search", type, term.toLowerCase());
    const cached = await cacheService.get<SearchResultItem[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const allData = await this.getAll(type);
    const filteredData = allData.filter((item) =>
      item.label.toLowerCase().includes(term.toLowerCase())
    );

    // Cache for 30 minutes (1800 seconds)
    await cacheService.set(cacheKey, filteredData, 1800);

    return filteredData;
  }

  async getPerson(id: number): Promise<Person> {
    const cacheKey = cacheService.generateKey("person", id.toString());
    const cached = await cacheService.get<Person>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(`${this.baseUrl}/people/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Person not found");
      }
      throw new Error(`Failed to fetch person: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as SwApiPerson;

    const movies = data.films.map((filmLink: string) => fetch(filmLink).then((res) => res.json()));
    const moviesData = (await Promise.all(movies)) as SwApiFilm[];

    const moviesReturned = moviesData.map((movie) => ({
      id: Number(movie.url.split("/").pop() || "0"),
      title: movie.title,
    })) as Pick<Movie, "id" | "title">[];

    const person: Person = {
      id,
      name: data.name,
      birthYear: data.birth_year,
      gender: data.gender,
      eyeColor: data.eye_color,
      hairColor: data.hair_color,
      height: Number(data.height),
      mass: Number(data.mass),
      movies: moviesReturned,
    };

    // Cache for 1 hour (3600 seconds)
    await cacheService.set(cacheKey, person, 3600);

    return person;
  }

  async getMovie(id: number): Promise<Movie> {
    const cacheKey = cacheService.generateKey("movie", id.toString());
    const cached = await cacheService.get<Movie>(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(`${this.baseUrl}/films/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Movie not found");
      }
      throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as SwApiFilm;

    const characters = data.characters.map((characterLink: string) =>
      fetch(characterLink).then((res) => res.json())
    );
    const charactersData = (await Promise.all(characters)) as SwApiPerson[];

    const charactersReturned = charactersData.map((character) => ({
      id: Number(character.url.split("/").pop() || "0"),
      name: character.name,
    })) as Pick<Person, "id" | "name">[];

    const movie: Movie = {
      id,
      title: data.title,
      openingCrawl: data.opening_crawl,
      characters: charactersReturned,
    };

    // Cache for 1 hour (3600 seconds)
    await cacheService.set(cacheKey, movie, 3600);

    return movie;
  }
}
