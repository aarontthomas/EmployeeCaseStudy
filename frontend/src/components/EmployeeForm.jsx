import React, { useEffect, useState } from "react";

export default function EmployeeForm({ onSubmit, editData }) {
  const [emp, setEmp] = useState({ name: "", email: "", department: "" });

  useEffect(() => {
  if (editData) {
    const { id = editData._id, name, email, department } = editData;
    setEmp({ id, name, email, department });
  }
}, [editData]);


  const submit = (e) => {
    e.preventDefault();
    onSubmit(emp);
    setEmp({ name: "", email: "", department: "" });
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: "1rem" }}>
      <h2>{emp.id ? "Edit Employee" : "Add New Employee"}</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={emp.name}
          required
          onChange={(e) => setEmp({ ...emp, name: e.target.value })}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={emp.email}
          required
          onChange={(e) => setEmp({ ...emp, email: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Department"
          value={emp.department}
          required
          onChange={(e) => setEmp({ ...emp, department: e.target.value })}
        />
      </div>
      <button type="submit">{emp.id ? "Update" : "Add"}</button>
    </form>
  );
}
