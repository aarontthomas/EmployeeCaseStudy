// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

// export default function EmployeeList({ employees, onEdit, onDelete }) {
//   if (!employees || employees.length === 0) {
//     return <p>No employees found. Add some above.</p>;
//   }

//   return (
//     <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
//       <thead>
//         <tr>
//           <th style={{ padding: "0.5rem" }}>S. No</th>  {/* Serial number column */}
//           <th>Name</th>
//           <th>Email</th>
//           <th>Department</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {employees.map((e, idx) => (
//           <tr key={e._id || e.id || idx} style={{ borderTop: "1px solid #ddd" }}>
//             <td style={{ padding: "0.5rem" }}>{idx + 1}</td>
//             <td>{e.name}</td>
//             <td>{e.email}</td>
//             <td>{e.department}</td>
//             <td>
//               <button onClick={() => onEdit(e)}><FontAwesomeIcon icon={faPenToSquare} /></button>{" "}
//               <button onClick={() => onDelete(e._id || e.id)}><FontAwesomeIcon icon={faTrash} /></button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function EmployeeList({ employees, onEdit, onDelete }) {
  if (!employees || employees.length === 0) {
    return <p>No employees found. Add some above.</p>;
  }

  const tableStyle = {
    width: "100%",
    marginTop: "1rem",
    borderCollapse: "collapse",
  };

  const cellStyle = {
    padding: "0.5rem",
    border: "1px solid #ddd", // Adds both horizontal & vertical borders
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>S. No</th>
          <th style={cellStyle}>Name</th>
          <th style={cellStyle}>Email</th>
          <th style={cellStyle}>Department</th>
          <th style={cellStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e, idx) => (
          <tr
            key={e._id || e.id || idx}
            style={{
              backgroundColor: idx % 2 === 0 ? "#93BFB7" : "#E4F2E7", // alternating row colors
            }}
          >
            <td style={cellStyle}>{idx + 1}</td>
            <td style={cellStyle}>{e.name}</td>
            <td style={cellStyle}>{e.email}</td>
            <td style={cellStyle}>{e.department}</td>
            <td style={cellStyle}>
              <button onClick={() => onEdit(e)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>{" "}
              <button onClick={() => onDelete(e._id || e.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

