import { Router } from "express";
import ApiController from "../Controllers/controller";
const router = Router();

router.get("/videos/:user_id", ApiController.getVideos, (req, res) => {
  res.status(200).send(res.locals.videos);
});
router.post("/videos", ApiController.postVideo, (req, res) => {
  res.status(200).send(res.locals.response);
});
router.put("/videos", ApiController.editVideo, (req, res) => {
  res.status(200).send(res.locals.response);
});
router.get("/videos/comments/:video_id", ApiController.getComments, (req, res) => {
  res.status(200).send(res.locals.comments);
});
router.post("/videos/comments", ApiController.postComment, (req, res) => {
  res.status(200).send(res.locals.response);
});

export default router;
