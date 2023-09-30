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
  Grid,
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

  const clearEnrollSelection = () => {
    setEmployee({
      name: "",
      salary: "",
      joinedDate: null,
      role: "",
      email: "",
      mobile: "",
    });
  };

  const clearRemoveSelection = () => {
    setSelectedEmployee("");
  };

  return (
    <Paper elevation={3} className="employee-form">
      <Typography variant="h6" className="form-title">
        <strong>Enroll Employee</strong>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={employee.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Monthly Salary"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required margin="normal">
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={employee.role}
                onChange={handleChange}
              >
                {/* Menu items */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email ID"
              name="email"
              value={employee.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              name="mobile"
              value={employee.mobile}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
        </Grid>
        <div className="button-container">
          <Button
            type="submit"
            variant="contained"
            color="inherit"
            className="emp-submit-button"
          >
            Enroll
          </Button>
          <Button
            sx={{ marginLeft: "20px" }}
            onClick={clearEnrollSelection}
            variant="contained"
            color="inherit"
            className="emp-submit-button"
          >
            Clear Selection
          </Button>
        </div>
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
        <div className="button-container">
          <Button
            variant="contained"
            className="emp-submit-button"
            color="inherit"
            onClick={handleRemoveEmployee}
          >
            Remove
          </Button>
          <Button
            sx={{ marginLeft: "20px" }}
            onClick={clearRemoveSelection}
            variant="contained"
            color="inherit"
            className="emp-submit-button"
          >
            Clear Selection
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default EmployeeForm;
