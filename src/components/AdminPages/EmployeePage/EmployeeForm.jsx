import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import "./EmployeeForm.css";

const EmployeeForm = ({ onSubmit }) => {
  const [employee, setEmployee] = useState({
    name: "",
    salary: "",
    joinedDate: null,
    role: "",
    email: "",
    mobile: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const existingEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];
    setEmployeeList(existingEmployees);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleDateChange = (date) => {
    setEmployee({ ...employee, joinedDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = [...employeeList, employee];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployeeList(updatedEmployees);
    setEmployee({
      name: "",
      salary: "",
      joinedDate: null,
      role: "",
      email: "",
      mobile: "",
    });
    toast.success("Employee enrolled successfully!");
  };

  const handleRemoveEmployee = () => {
    if (selectedEmployee) {
      const updatedEmployees = employeeList.filter(
        (emp) => emp.name !== selectedEmployee
      );
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployeeList(updatedEmployees);
      setSelectedEmployee("");
      toast.success("Employee removed successfully!");
    }
  };

  return (
    <Paper elevation={3} className="employee-form">
      <Typography variant="h6" className="form-title">
        <strong>Enroll Employee</strong>
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Monthly Salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Joined Date"
            name="joinedDate"
            value={employee.joinedDate}
            onChange={handleDateChange}
            fullWidth
            required
            renderInput={(params) => <TextField {...params} margin="normal" />}
          />
        </LocalizationProvider>
        <FormControl fullWidth required margin="normal">
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            label="Role"
            name="role"
            value={employee.role}
            onChange={handleChange}
          >
            <MenuItem value="Store Manager">Store Manager</MenuItem>
            <MenuItem value="Assistant Store Manager">
              Assistant Store Manager
            </MenuItem>
            <MenuItem value="Department Manager">Department Manager</MenuItem>
            <MenuItem value="Shift Supervisor">Shift Supervisor</MenuItem>
            <MenuItem value="Cashier Supervisor">Cashier Supervisor</MenuItem>
            <MenuItem value="Cashier">Cashier</MenuItem>
            <MenuItem value="Stock Clerk">Stock Clerk</MenuItem>
            <MenuItem value="Daily Worker">Deli Worker</MenuItem>
            <MenuItem value="Bakery Worker">Bakery Worker</MenuItem>
            <MenuItem value="Produce Clerk">Produce Clerk</MenuItem>
            <MenuItem value="Customer Service Representative">
              Customer Service Representative
            </MenuItem>
            <MenuItem value="Cart Attendant">Cart Attendant</MenuItem>
            <MenuItem value="Janitorial Staff">Janitorial Staff</MenuItem>
            <MenuItem value="Security Guard">Security Guard</MenuItem>
            <MenuItem value="Interns/Apprentices">Interns/Apprentices</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Email ID"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Mobile Number"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="inherit"
          className="emp-submit-button"
        >
          Enroll
        </Button>
      </form>

      <div className="employee-list">
        <Typography variant="h6">
          <strong>Remove Employee</strong>
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="employee">Select Employee</InputLabel>
          <Select
            label="Select Employee"
            name="employee"
            onChange={(e) => setSelectedEmployee(e.target.value)}
            value={selectedEmployee}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {employeeList.map((emp) => (
              <MenuItem key={emp.name} value={emp.name}>
                {emp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          className="emp-submit-button"
          color="inherit"
          onClick={handleRemoveEmployee}
        >
          Remove
        </Button>
      </div>
    </Paper>
  );
};

export default EmployeeForm;
