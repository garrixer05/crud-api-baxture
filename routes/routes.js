import { Router } from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:userID", getUser);
router.post("/users", addUser);
router.put("/users/:userID", updateUser);
router.delete("/users/:userID", deleteUser);

export default router;
