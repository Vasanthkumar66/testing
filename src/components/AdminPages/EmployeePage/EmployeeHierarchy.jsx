import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import './EmployeeHierarchy.css'
const EmployeeHierarchy = ({ employees }) => {
  const renderEmployeeTree = (employee) => (
    <Card key={employee.email} className="employee-card">
      <CardContent>
        <Typography variant="h6">{employee.name}</Typography>
        <Typography variant="body2">Role: {employee.role}</Typography>
        {employee.subordinates && employee.subordinates.length > 0 && (
          <div className="subordinates">
            {employee.subordinates.map((subordinate) =>
              renderEmployeeTree(subordinate)
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="employee-hierarchy">
      {employees.map((employee) => renderEmployeeTree(employee))}
    </div>
  );
};

export default EmployeeHierarchy;
