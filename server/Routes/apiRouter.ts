import { Router } from "express";
import ApiController from "../Controllers/controller";
const router = Router();

router.get("/videos", ApiController.getVideos, (req, res) => {
  res.status(200).send(res.locals.videos);
});
router.post("/videos", ApiController.postVideo, (req, res) => {
  res.status(200).send("Post request successful");
});
router.put("/videos", ApiController.editVideo, (req, res) => {
  res.status(200).send("Edit request successful");
});
router.get("/videos/comments/:video_id", ApiController.getComments, (req, res) => {
  res.status(200).send(res.locals.comments);
});
router.post("/videos/comments", ApiController.postComment, (req, res) => {
  res.status(200).send("Comment Post request successful");
});

export default router;
