import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/empService";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css"

function App() {
  const [employees, setEmployees] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data.employees || []);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch", "error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (emp) => {
    try {
      if (emp?.id) {
        await updateEmployee(emp);
        Swal.fire("Updated!", "Employee updated successfully.", "success");
      } else {
        await addEmployee(emp);
        Swal.fire("Added!", "Employee added successfully.", "success");
      }
      setEditData(null);
      fetchEmployees();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Operation failed", "error");
    }
  };

  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Confirm delete",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (ok.isConfirmed) {
      try {
        await deleteEmployee(id);
        Swal.fire("Deleted!", "Employee removed.", "success");
        fetchEmployees();
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
      }
    }
  };

return (
    <div className="page-container">
      <div className="left-side">
        <h1>Employee Manager</h1>
        <EmployeeForm onSubmit={handleSubmit} editData={editData} />
      </div>
      <div className="right-side">
        <EmployeeList
          employees={employees}
          onEdit={setEditData}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
