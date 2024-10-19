import express from "express";
import {
  addService,
  deleteService,
  getAllServices,
  getService,
  updateService,
} from "../controller/services.controller.js";

const router = express.Router();

router.post("/addService", addService);
router.get("/", getAllServices);
router.get("/:id", getService);
router.put("/updateService/:id", updateService);
router.delete("/deleteService/:id", deleteService);

export default router;
