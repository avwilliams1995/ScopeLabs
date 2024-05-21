import { Request, Response, NextFunction } from "express";

const ApiController = {
  // Get Videos
  async getVideos(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await fetch(
        `https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=drew_williams`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      res.locals.videos = await response.json();
      console.log(res.locals.videos);
      return next();
    } catch {
      return next({
        err: "error in getVideos controller",
      });
    }
  },

  // Create Post
  async postVideo(req: Request, res: Response, next: NextFunction) {
    const { user_id, video_url, title, description } = req.body;
    try {
      const response = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=drew_williams",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, video_url, title, description }),
        }
      );
      const data = await response.json();
      console.log(data);
      return next();
    } catch {
      return next({
        err: "error in postVideo controller",
      });
    }
  },

  // Get Comments
  async getComments(req: Request, res: Response, next: NextFunction) {
    const video_id = req.params["video_id"]
    try {
      const response = await fetch(
        `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${video_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      res.locals.comments = await response.json();
      console.log(res.locals.comments);
      return next();
    } catch {
      return next({
        err: "error in postComment controller",
      });
    }
  },

  // Post Comment
  async postComment(req: Request, res: Response, next: NextFunction) {
    const { video_id, content, user_id } = req.body;
    try {
      const response = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_id, content, user_id }),
        }
      );
      const data = await response.json();
      console.log(data);
      return next();
    } catch {
      return next({
        err: "error in postComment controller",
      });
    }
  },

  // Edit Video
  async editVideo(req: Request, res: Response, next: NextFunction) {
    const { video_id, title, description } = req.body;
    try {
      const response = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_id, title, description }),
        }
      );
      const data = await response.json();
      console.log(data);
      return next();
    } catch {
      return next({
        err: "error in editVideo controller",
      });
    }
  },
};
export default ApiController;
