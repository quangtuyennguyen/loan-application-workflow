import { Router } from "express";
import * as applicationController from "@/controllers/application.controller";

const router = Router();

router.post("/", applicationController.create);
router.get("/:id", applicationController.getById);

export default router;
