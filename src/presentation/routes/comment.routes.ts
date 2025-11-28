import { Router } from "express";
import { commentController } from "../../container";

const router = Router();

router.post("/", (req, res) => commentController.createComment(req, res));
router.get("/post/:postId", (req, res) =>
  commentController.getCommentsByPostId(req, res),
);
router.put("/:id", (req, res) => commentController.updateComment(req, res));
router.delete("/:id", (req, res) => commentController.deleteComment(req, res));

export default router;
