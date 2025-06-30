import { Response, NextFunction } from "express";
import { ISwService } from "../services/ISwApiService";
import { LinkType } from "../lib/types";
import { SearchRequest } from "../middlewares/validations/searchValidation";
import { PeopleRequest } from "../middlewares/validations/peopleValidation";
import { MoviesRequest } from "../middlewares/validations/moviesValidation";

export class SwController {
  constructor(private swService: ISwService) {}

  async search(req: SearchRequest, res: Response): Promise<void> {
    const { type, term } = req.query;
    const results = await this.swService.search(type as LinkType, term);
    res.status(200).json(results);
  }

  async getPerson(req: PeopleRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const personId = Number(id);

      const person = await this.swService.getPerson(personId);
      res.status(200).json(person);
    } catch (error) {
      next(error);
    }
  }

  async getMovie(req: MoviesRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const movieId = Number(id);

      const movie = await this.swService.getMovie(movieId);
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }
}
