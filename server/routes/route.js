import express from "express";
import {
  deleteTransection,
  getCategories,
  getTransactions,
  get_Labels,
  setCategories,
  setTransactions,
} from "../controllers/controllers.js";

const router = express.Router();

router.post("/categories/post", setCategories);
router.get("/categories/get", getCategories);

router.post("/transactions/post", setTransactions);
router.get("/transactions/get", getTransactions);
router.delete("/transactions", deleteTransection);
router.get("/transactions/labels", get_Labels);

export default router;
