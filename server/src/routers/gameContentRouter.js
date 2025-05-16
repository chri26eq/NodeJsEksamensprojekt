import { Router } from "express";

import { getCountries } from "../database/repos/countriesRepo.js";
import { getCarBrands } from "../database/repos/carBrandsRepo.js";

const router = Router();

router.get("/game/content", async (req, res) => {
  const countries = await getCountries();
  const carBrands = await getCarBrands();

  res.send({ data: { countries, carBrands } });
});

export default router;
