import React, { useState, useEffect } from "react";
import logo from "../../HomePage/Headers/header.png";
import InventoryIcon from "@mui/icons-material/Inventory";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import { useAuth } from "../../AuthPages/useAuth";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import "./CustomerPage.css";

const CustomerPage = () => {
  const [typedText, setTypedText] = useState("");
  const delay = 75;
  const { adminLogout } = useAuth();
  const [effVar, setEffVar] = useState(true);
  const fullText =
    "\u00A0\u00A0\u00A0Your Grocery Delivery Partner . . . . . . . . . . ";
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    // Fetch customer details from the /cart/customer-details endpoint or your API endpoint
    fetch("http://localhost:8057/cart/customer-details") // Update with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.error("Error fetching customer details:", error));
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
            <div sx={{ display: "flex", alignItems: "center", mt: "8px" }}>
              <Link
                to="/employee-page"
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
                  <BadgeIcon />
                  <Typography variant="body2" sx={{ paddingLeft: "8px" }}>
                    Employee Page
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
      <Typography
        variant="h4"
        sx={{
          fontFamily: "fantasy",
          backgroundImage:
            "linear-gradient(to left bottom, #eeb03d, #c2763f, #874839, #452527, #000000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: "5px",
          marginTop: "20px",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Customer Management
      </Typography>
      <div className="cst-centered-container">
        <div className="cst-product-card-container">
          {customers.map((customer) => (
            <Card
              key={customer.userId}
              className="cst-product-card"
              sx={{
                // Card styles
              }}
            >
              <CardContent className="cst-product-details">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="cst-product-title"
                  sx={{ fontFamily: "sans-serif" }}
                >
                  <strong>
                    <u>{customer.username}</u>
                  </strong>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="cst-product-description"
                >
                  <em>Email: </em>
                  {customer.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="cst-product-description"
                >
                  <div className="cst-product-rating">
                    <em>Bought Products: </em>
                    {customer.cartItems.length >= 1 ? (
                      customer.cartItems.map((cartItem) => cartItem.productName).join(", ")
                    ) : (
                      <div>No products to show</div>
                    )}
                  </div>
                  <div className="cst-product-small-card-container">
                    {customer.cartItems.map((cartItem, index) => (
                      <div className="cst-small-product-card" key={index}>
                        <img src={cartItem.image} alt={`Product ${index}`} />
                      </div>
                    ))}
                  </div>
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  className="cst-product-price"
                >
                  <span className="price">
                    Total Cost of Products:{" "}
                    <strong>₹{customer.cartItems.reduce((total, cartItem) => total + cartItem.price, 0).toFixed(2)}</strong>
                  </span>
                </Typography>
                <div className="cst-product-rating">
                  <strong>
                    Savings: ₹{(customer.cartItems.reduce((total, cartItem) => total + cartItem.price, 0) * 0.25).toFixed(2)}
                  </strong>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerPage;
