import React, { useState, useEffect } from "react";
import logo from "../../HomePage/Headers/header.png";
import CategoryIcon from "@mui/icons-material/Category";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useAuth } from "../../AuthPages/useAuth";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Inventory.css";

const Inventory = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    quantity: 0,
  });
  const [typedText, setTypedText] = useState("");
  const delay = 75;
  const { adminLogout } = useAuth();
  const [effVar, setEffVar] = useState(true);
  const fullText =
    "\u00A0\u00A0\u00A0Your Grocery Delivery Partner . . . . . . . . . . ";
  const [selectedProduct, setSelectedProduct] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // if (name === "images") {
    //   setFormData({ ...formData, images: value.split(",") });
    // }
  };

  // function generateRandomId() {
  //   return Math.ceil(Math.random() * 10000);
  // }

  // const handleAddItem = async () => {
  //   // const existingItems = JSON.parse(localStorage.getItem("items")) || [];
  //   // const newItem = { ...formData, id: generateRandomId() };
  //   // existingItems.push(newItem);
  //   // localStorage.setItem("items", JSON.stringify(existingItems));

  //   setFormData({
  //     title: "",
  //     price: 0,
  //     description: "",
  //     image: "",
  //     quantity: 0,
  //   });
  //   toast.success("Item added successfully to the Inventory", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 2500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //   });
  //   setInventoryItems(existingItems);
  // };

  const handleAddItem = async () => {
    try {
      const product = {
        title: formData.title,
        price: formData.price,
        image: formData.image,
        description: formData.description,
        quantity: formData.quantity,
      };
      const response = await fetch("http://localhost:8057/admin/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      // console.log(response);
      // console.log(product);

      if (response.ok) {
        setFormData({
          title: "",
          price: 0,
          description: "",
          image: "",
          quantity: 0,
        });

        toast.success("Item added successfully to the Inventory", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      } else {
        toast.error("Failed to fetch product details", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the item", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    const fetchdata = async () => {
      const response = await fetch("http://localhost:8057/allproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respdata = await response.json();
      setInventoryItems(respdata);
    };
    fetchdata();
  };

  const handleRemoveItem = async () => {
    const response = await fetch("http://localhost:8057/removeproduct", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: selectedProduct,
    });
    const resptext = await response.text();
    // console.log(response)
    // console.log(resptext)
    setSelectedProduct("");
    toast.success("Item removed successfully from the Inventory", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });
    const fetchdata = async () => {
      const response = await fetch("http://localhost:8057/allproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respdata = await response.json();
      setInventoryItems(respdata);
    };
    fetchdata();
  };

  const clearAddItemFields = () => {
    setFormData({
      title: "",
      price: 0,
      description: "",
      image: "",
      quantity: 0,
    });
  };

  const clearRemoveItemField = () => {
    setSelectedProduct("");
  };

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("http://localhost:8057/allproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respdata = await response.json();
      setInventoryItems(respdata);
    };
    fetchdata();
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
          marginTop: "20px",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add a shadow here
        }}
      >
        Inventory Management
      </Typography>
      <Container className="inv-container">
        <div className="inv-form-container">
          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price in ₹"
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    marginTop: "12px",
                    color: "black",
                    backgroundColor: "#eeb03d",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#eeb03d",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
                <Button
                  sx={{
                    marginTop: "12px",
                    marginLeft: "12px",
                    color: "black",
                    backgroundColor: "#eeb03d",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#eeb03d",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  onClick={clearAddItemFields}
                >
                  Clear Selection
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Product to Remove</InputLabel>
                  <Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {inventoryItems.map((item) => (
                      <MenuItem
                        key={item.title.length + item.price}
                        value={item.title}
                      >
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    marginTop: "12px",
                    color: "black",
                    backgroundColor: "#eeb03d",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#eeb03d",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleRemoveItem}
                >
                  Remove Item
                </Button>
                <Button
                  sx={{
                    marginTop: "12px",
                    marginLeft: "12px",
                    color: "black",
                    backgroundColor: "#eeb03d",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#eeb03d",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  onClick={clearRemoveItemField}
                >
                  Clear Selection
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default Inventory;
