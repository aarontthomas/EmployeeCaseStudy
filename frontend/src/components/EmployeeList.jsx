import React from "react";

export default function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees found. Add some above.</p>;
  }

  return (
    <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ padding: "0.5rem" }}>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={e.id} style={{ borderTop: "1px solid #ddd" }}>
            <td style={{ padding: "0.5rem" }}>{e.id}</td>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>
            <td>
              <button onClick={() => onEdit(e)}>Edit</button>{" "}
              <button onClick={() => onDelete(e._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
