// controllers/empController.js
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import redisClient from '../config/redisClient.js';
import { publisher } from '../config/messageClient.js';


const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

export const getAnalyticsCounts = async () => {
  const data = {};
  for await (const key of redisClient.scanIterator({ MATCH: 'analytics:route:*' })) {
    for (const k of key) {
      const count = await redisClient.get(k);
      const route = k.replace('analytics:route:', '');
      data[route] = count;
    }
  }
  return data;
};

export const addEmployee = async (req, res) => {
  const { name, email, department } = req.body;

  if (!name || !email || !department) {
    return res
      .status(400)
      .json({ message: "Name, email, and department are required." });
  }

  try {
    console.log({ name, email, department })
    const emp = await Employee.create({ name, email, department });
    await publisher.publish('employee:operations', 'EMPLOYEE ADDED');
    return res
      .status(201)
      .json({ message: "Employee added.", employee: emp });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error("Create error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    const routeCounts = await getAnalyticsCounts();
    // console.log(routeCounts)
    res.status(200).json({ employees, message: 'Employees fetched successfully.', routeCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching employees.' });
  }
};


export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid ID.' });

  try {
    const emp = await Employee.findById(id);
    if (!emp) return res.status(404).json({ message: 'Employee not found.' });
    res.status(200).json({ employee: emp, message: 'Employee fetched successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching employee.' });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid ID.' });

  try {
    const updated = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
    });
    if (!updated) return res.status(404).json({ message: 'Employee not found.' });
    await publisher.publish('employee:operations', 'EMPLOYEE UPDATED');
    res.status(200).json({ message: 'Employee updated successfully.', employee: updated });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Error updating employee.' });
  }
};

export const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  console.log(req.params)
  if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid ID.' });

  try {
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found.' });
    await publisher.publish('employee:operations', 'EMPLOYEE DELETED');
    res.status(200).json({ message: 'Employee deleted successfully.', employee: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting employee.' });
  }
};
