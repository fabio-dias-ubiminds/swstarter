import { Router } from "express";
import { SwController } from "../controllers/swController";
import { SwApiService } from "../services/swApiService";
import { validateSearchRequest } from "../middlewares/validations/searchValidation";
import { validatePeopleRequest } from "../middlewares/validations/peopleValidation";
import { validateMoviesRequest } from "../middlewares/validations/moviesValidation";
import { cacheMiddleware } from "../middlewares";

const router = Router();

const swService = new SwApiService();
const swController = new SwController(swService);

router.get("/search", validateSearchRequest, cacheMiddleware(), (req, res) =>
  swController.search(req, res)
);
router.get("/people/:id", validatePeopleRequest, cacheMiddleware(), (req, res, next) =>
  swController.getPerson(req, res, next)
);
router.get("/movies/:id", validateMoviesRequest, cacheMiddleware(), (req, res, next) =>
  swController.getMovie(req, res, next)
);

export default router;
