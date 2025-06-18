import { Router } from "express";

import { getTrackById } from "../database/repos/tracksRepo.js";

const router = Router();

router.get("/content/tracks/:id", async (req, res) => {
  const trackId = req.params.id;

  const track = await getTrackById(trackId);

  res.send({ data:  track  });
});

export default router;
