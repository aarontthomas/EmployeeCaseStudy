import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Ensure there's no trailing slash; e.g. "http://localhost:5000/api/v1/emp"
const API = `${BASE_URL}`;

// Retrieve all employees
export const getEmployees = () => axios.get(`${API}`);

// Retrieve a specific employee by ID
export const getEmployee = (id) => axios.get(`${API}/${id}`);

// Add a new employee
export const addEmployee = (employee) => axios.post(`${API}`, employee);

// Update an existing employee
export const updateEmployee = (employee) =>
  axios.put(`${API}/${employee.id}`, employee);

// Delete an employee by ID
export const deleteEmployee = (id) => axios.delete(`${API}/${id}`);
