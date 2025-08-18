import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../App.css"

// Register ChartJS components for Pie chart
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard({ routeCounts }) {
  // Prepare data for the chart
  const routes = Object.keys(routeCounts);
  const counts = Object.values(routeCounts);
  
  // Color generator for pie segments
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(
        `hsl(${(i * 360) / count}, 70%, 50%)`
      );
    }
    return colors;
  };

  const chartData = {
    labels: routes,
    datasets: [
      {
        label: "API Hits",
        data: counts,
        backgroundColor: generateColors(routes.length),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
          labels: {
            usePointStyle: true,
            textAlign: "left"
        }
      },
      title: {
        display: true,
        text: "API Endpoint Distribution",
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  const routeNameMap = {
  "GET:/api/v1/emp": "Employee List Fetch",
  "POST:/api/v1/emp": "Add Employee",
  "PUT:/api/v1/emp/:id": "Update Employee",
  "DELETE:/api/v1/emp/:id": "Delete Employee",
  "POST:/api/v1/emp/register": "User Register",
  "POST:/api/v1/emp/login": "User Login"
  };


  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <h3>API Analytics</h3>
        <ul>
          {Object.entries(routeCounts).map(([route, count]) => {
            const displayName = routeNameMap[route] || route; // Fallback to route if not in dictionary
            return (
              <li key={route}>
                <strong>{displayName}:</strong> {count} hits
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="chart-container">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
