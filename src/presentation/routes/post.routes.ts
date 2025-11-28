import { Router } from "express";
import { postController } from "../../container";

const router = Router();

router.post("/", (req, res) => postController.createPost(req, res));
router.get("/", (req, res) => postController.getAllPosts(req, res));
router.get("/:id", (req, res) => postController.getPostById(req, res));
router.get("/slug/:slug", (req, res) => postController.getPostBySlug(req, res));
router.put("/:id", (req, res) => postController.updatePost(req, res));
router.delete("/:id", (req, res) => postController.deletePost(req, res));

export default router;
