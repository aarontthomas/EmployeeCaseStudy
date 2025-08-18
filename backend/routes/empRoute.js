import express from "express";
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../controllers/empController.js";  // Adjust path as needed

const empRouter = express.Router();

// Create a new employee
empRouter.post("/", addEmployee);

// Get all employees
empRouter.get("/", getEmployees);

// Get a specific employee by ID
empRouter.get("/:id", getEmployeeById);

// Update an employee by ID
empRouter.put("/:id", updateEmployee);

// Delete an employee by ID
empRouter.delete("/:id", deleteEmployee);

export default empRouter;
