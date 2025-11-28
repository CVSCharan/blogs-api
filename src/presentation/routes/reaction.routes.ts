import { Router } from "express";
import { reactionController } from "../../container";

const router = Router();

router.post("/likes", (req, res) => reactionController.addLike(req, res));
router.delete("/likes/:userId/:postId", (req, res) =>
  reactionController.removeLike(req, res),
);
router.post("/bookmarks", (req, res) =>
  reactionController.addBookmark(req, res),
);
router.delete("/bookmarks/:userId/:postId", (req, res) =>
  reactionController.removeBookmark(req, res),
);

export default router;
