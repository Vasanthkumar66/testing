import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
import axios from "axios";
import "./EmployeeForm.css";

const EmployeeForm = ({ onAddEmployee, onRemoveEmployee }) => {
  const [employee, setEmployee] = useState({
    name: "",
    salary: 0,
    joinedDate: null,
    role: "",
    email: "",
    mobile: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8057/employees/all");
      setEmployeeList(response.data);
      //console.log(response.data)
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleDateChange = (date) => {
    setEmployee({ ...employee, joinedDate: date });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8057/employees",
        employee
      );
      setEmployeeList([...employeeList, response.data]);
      setEmployee({
        name: "",
        salary: 0,
        joinedDate: null,
        role: "",
        email: "",
        mobile: "",
      });
      toast.success("Employee enrolled successfully!");
      onAddEmployee()
    } catch (error) {
      console.error("Failed to enroll employee:", error);
      toast.error("Failed to enroll employee.");
    }
  };

  const handleRemoveEmployee = async () => {
    if (selectedEmployee) {
      try {
        await axios.delete(
          `http://localhost:8057/employees/${selectedEmployee}`
        );
        setEmployeeList(
          employeeList.filter((emp) => emp.id !== selectedEmployee)
        );
        setSelectedEmployee("");
        toast.success("Employee removed successfully!");
        // Trigger a re-render by calling the onRemoveEmployee callback
        onRemoveEmployee();
      } catch (error) {
        console.error("Failed to remove employee:", error);
        toast.error("Failed to remove employee.");
      }
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
      <form>
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
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
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
      <MenuItem value="Employee">Employee</MenuItem>
      <MenuItem value="Manager">Manager</MenuItem>
      <MenuItem value="Supervisor">Supervisor</MenuItem>
      <MenuItem value="Cashier">Cashier</MenuItem>
      <MenuItem value="Stock Clerk">Stock Clerk</MenuItem>
      <MenuItem value="Customer Service Representative">Customer Service Representative</MenuItem>
      <MenuItem value="Security Guard">Security Guard</MenuItem>
      <MenuItem value="Janitor">Janitor</MenuItem>
      <MenuItem value="Accountant">Accountant</MenuItem>
      <MenuItem value="Human Resources Manager">Human Resources Manager</MenuItem>
      <MenuItem value="Store Director">Store Director</MenuItem>
      <MenuItem value="Assistant Manager">Assistant Manager</MenuItem>
      <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
      <MenuItem value="Purchasing Manager">Purchasing Manager</MenuItem>
      <MenuItem value="Marketing Manager">Marketing Manager</MenuItem>
      <MenuItem value="Store Planner">Store Planner</MenuItem>
      <MenuItem value="Merchandising Manager">Merchandising Manager</MenuItem>
      <MenuItem value="Loss Prevention Manager">Loss Prevention Manager</MenuItem>
      <MenuItem value="Customer Experience Manager">Customer Experience Manager</MenuItem>
      <MenuItem value="Regional Manager">Regional Manager</MenuItem>
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
            type="button"
            variant="contained"
            color="primary"
            className="emp-submit-button"
            onClick={handleSubmit}
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
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {employeeList.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="button-container">
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="emp-submit-button"
            // onClick={handleRemoveEmployee}
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
