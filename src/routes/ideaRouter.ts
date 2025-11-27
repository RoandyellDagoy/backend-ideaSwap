import { Router } from "express";
import { ideasController } from "../controllers/ideasController"

const router = Router();


router.get("/", ideasController.getAllIdeas);
router.post("/create", ideasController.createIdea);
router.put("/:id", ideasController.updateIdea);
router.delete("/:id", ideasController.deleteIdea);

export default router;