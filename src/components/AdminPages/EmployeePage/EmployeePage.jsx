import React, { useState, useEffect } from "react";
import logo from "../../HomePage/Headers/header.png";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import { useAuth } from "../../AuthPages/useAuth";
import EmployeeForm from "./EmployeeForm";
import EmployeeHierarchy from "./EmployeeHierarchy";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";

import { Typography, Button, Box } from "@mui/material";
import "./EmployeePage.css";

const EmployeePage = () => {
  const [typedText, setTypedText] = useState("");
  const delay = 75;
  const { adminLogout } = useAuth();
  const [effVar, setEffVar] = useState(true);
  const fullText =
    "\u00A0\u00A0\u00A0Your Grocery Delivery Partner . . . . . . . . . . ";
  const [employees, setEmployees] = useState([]);

  const handleEnrollEmployee = (employee) => {
    // Update employees state and local storage
    const updatedEmployees = [...employees, employee];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  useEffect(() => {
    // Load employees from local storage on component mount
    const existingEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(existingEmployees);

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, delay);
    return () => {
      clearInterval(typingInterval);
    };
  }, [effVar]);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setEffVar((prevEffVar) => !prevEffVar);
    }, 15000);
    return () => {
      clearInterval(toggleInterval);
    };
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "black", height: "100px" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              marginTop: "auto",
              marginBottom: "auto",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} style={{ width: "120px" }} alt="Logo" />
            </Link>
            <Typography
              variant="h7"
              component="div"
              sx={{
                fontFamily: "unset",
                flexGrow: 1,
                color: "grey",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <span className="head-title">{typedText}</span>
            </Typography>
            <div
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "8px",
              }}
            >
              <Link
                to="/customer-page"
                style={{ textDecoration: "none", marginRight: "8px" }}
              >
                <Button
                  className="mobile-button button"
                  sx={{
                    color: "black",
                    backgroundColor: "#eeb03d",
                    marginLeft: "13px",
                    marginTop: "7px",
                  }}
                >
                  <SupportAgentIcon />
                  <Typography variant="body2" sx={{ paddingLeft: "8px" }}>
                    Customer Page
                  </Typography>
                </Button>
              </Link>
              <Link
                to="/inventory"
                style={{ textDecoration: "none", marginRight: "8px" }}
              >
                <Button
                  className="mobile-button button"
                  sx={{
                    color: "black",
                    backgroundColor: "#eeb03d",
                    marginLeft: "13px",
                    marginTop: "7px",
                  }}
                >
                  <InventoryIcon />
                  <Typography variant="body2" sx={{ paddingLeft: "8px" }}>
                    Inventory
                  </Typography>
                </Button>
              </Link>
              <Link
                to="/product-catalogue"
                style={{ textDecoration: "none", marginRight: "8px" }}
              >
                <Button
                  className="mobile-button button"
                  sx={{
                    color: "black",
                    backgroundColor: "#eeb03d",
                    marginLeft: "13px",
                    marginTop: "7px",
                  }}
                >
                  <CategoryIcon />
                  <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
                    Product Catalog
                  </Typography>
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  className="mobile-button button"
                  sx={{
                    color: "black",
                    backgroundColor: "#eeb03d",
                    marginLeft: "13px",
                    marginTop: "7px",
                  }}
                  onClick={() => adminLogout()}
                >
                  <PersonIcon />
                  <Typography variant="body2" sx={{ paddingLeft: "8px" }}>
                    User Sign in
                  </Typography>
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <EmployeeForm onSubmit={handleEnrollEmployee} />
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: "13px" }}>
            <EmployeeHierarchy employees={employees} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EmployeePage;
