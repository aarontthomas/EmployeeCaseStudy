import express from "express";
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../controllers/empController.js";  // Adjust path as needed

export const router = express.Router();

// Create a new employee
router.post("/", addEmployee);

// Get all employees
router.get("/", getEmployees);

// Get a specific employee by ID
router.get("/:id", getEmployeeById);

// Update an employee by ID
router.put("/:id", updateEmployee);

// Delete an employee by ID
router.delete("/:id", deleteEmployee);
