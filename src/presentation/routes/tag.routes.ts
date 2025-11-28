import { Router } from "express";
import { tagController } from "../../container";

const router = Router();

router.post("/", (req, res) => tagController.createTag(req, res));
router.get("/", (req, res) => tagController.getAllTags(req, res));
router.get("/:id", (req, res) => tagController.getTagById(req, res));
router.get("/slug/:slug", (req, res) => tagController.getTagBySlug(req, res));
router.delete("/:id", (req, res) => tagController.deleteTag(req, res));

export default router;
