import { LinkType, Movie, Person, SearchResultItem } from "../lib/types";

export interface ISwService {
  search(type: LinkType, term: string): Promise<SearchResultItem[]>;
  getPerson(id: number): Promise<Person>;
  getMovie(id: number): Promise<Movie>;
}
