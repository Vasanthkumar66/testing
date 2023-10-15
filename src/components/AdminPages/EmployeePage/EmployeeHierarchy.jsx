import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "./EmployeeHierarchy.css";

const roleWeightage = {
  "Regional Manager": 1,
  "Marketing Manager": 2,
  "Purchasing Manager": 3,
  "Inventory Manager": 4,
  "Assistant Manager": 5,
  "Store Director": 6,
  "Human Resources Manager": 7,
  "Accountant": 8,
  "Janitor": 9,
  "Security Guard": 10,
  "Customer Service Representative": 11,
  "Stock Clerk": 12,
  "Cashier": 13,
  "Supervisor": 14,
  "Manager": 15,
  "Employee": 16,
};

const EmployeeHierarchy = ({ employees }) => {
  const sortedEmployees = [...employees].sort(
    (a, b) => roleWeightage[a.role] - roleWeightage[b.role]
  );

  const rows = [];
  let currentWeightage = null;
  let currentRow = [];

  sortedEmployees.forEach((employee) => {
    const roleWeight = roleWeightage[employee.role];

    if (roleWeight !== currentWeightage) {
      if (currentRow.length > 0) {
        rows.push({ weightage: currentWeightage, employees: currentRow });
      }
      currentWeightage = roleWeight;
      currentRow = [];
    }

    currentRow.push(employee);
  });

  if (currentRow.length > 0) {
    rows.push({ weightage: currentWeightage, employees: currentRow });
  }

  return (
    <div className="employee-hierarchy">
      {console.log(rows)}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="role-group">
          <Typography variant="h5">
            {console.log(row.weightage)}
           <strong> {getRoleName(row.weightage)+"s"}</strong>
          </Typography>
          <Grid container spacing={2}>
            {row.employees.map((employee) => (
              <Grid item xs={12} sm={6} key={employee.id}>
                <Card className="employee-card">
                  <CardContent>
                    <Typography variant="h6">{employee.name}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {employee.email}</Typography>
                    <Typography variant="body2"><strong>Contact:</strong> {employee.mobile}</Typography>
                    <Typography variant="body2"><strong>Salary:</strong> ₹{employee.salary}</Typography>
                    <Typography variant="body2"><strong>Joined on:</strong> {employee.joinedDate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
};

const getRoleName = (weightage) => {
  const roleName = Object.keys(roleWeightage).find(
    (key) => roleWeightage[key] === weightage
  );
  return roleName || "Unknown";
};

export default EmployeeHierarchy;
