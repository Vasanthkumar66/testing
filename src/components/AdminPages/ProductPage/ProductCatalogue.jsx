import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useAuth } from "../../AuthPages/useAuth";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import logo from "../../HomePage/Headers/header.png";
import PersonIcon from "@mui/icons-material/Person";
import "./ProductCatalogue.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const ProductCard = ({ product }) => {
  const { title, price, description, image, quantity } = product;

  return (
    <Card
      className="product-card"
      sx={{
        background:
          "linear-gradient(to top, #eeeeee, #ebe6eb, #ecdde3, #eed5d5, #ebcec3, #ebcebb, #e8cfb4, #e2d0ae, #e8d4af, #edd8af, #f3ddb0, #f8e1b0)",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardMedia
        className="product-image"
        image={image}
        title={title}
        children={<div></div>}
      />
      <CardContent className="product-details">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="product-title"
          sx={{ fontFamily: "sans-serif" }}
        >
          <strong>
            <u>{title}</u>
          </strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="product-description"
        >
          {description}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          className="product-price"
        >
          <span className="price">
            <strong>₹ {price} </strong>
          </span>
          <span className="head">
            {" "}
            M.R.P:<s>{parseInt(price) + parseInt(price) * (25 / 100)}</s>
          </span>
          <span className="tail"> (25%off)</span>
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="product-rating">{generateStars(3)}</div>
        </div>
        {parseInt(quantity) > 13 ? (
          <Typography
            variant="body1"
            color="green"
            className="product-availability"
          >
            <VerifiedIcon sx={{ fontSize: "13px", marginTop: "12px" }} />
            <strong> In Stock</strong>
          </Typography>
        ) : parseInt(quantity) === 0 ? (
          <Typography
            variant="body1"
            color="red"
            className="product-availability"
          >
            <VerifiedIcon sx={{ fontSize: "13px", marginTop: "12px" }} />
            <strong> Out of Stock !!</strong>
          </Typography>
        ) : (
          <Typography
            variant="body1"
            color="red"
            className="product-availability"
          >
            <VerifiedIcon sx={{ fontSize: "13px", marginTop: "12px" }} />
            <strong> Only {quantity} left !!</strong>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const generateStars = (rating) => {
  const maxStars = 5;
  const starIcons = [];
  for (let i = 0; i < maxStars; i++) {
    if (i < rating) {
      starIcons.push(
        <span key={i} className="star-icon gold">
          &#9733;
        </span>
      );
    } else {
      starIcons.push(
        <span key={i} className="star-icon gold">
          &#9734;
        </span>
      );
    }
  }
  return starIcons;
};

const ProductCatalogue = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "\u00A0Your Grocery Delivery Partner...";
  const delay = 75;
  const [effVar, setEffVar] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showNoMatchCard, setShowNoMatchCard] = useState(false);
  const noMatchCardRef = useRef(null);
  const { adminLogout } = useAuth();

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

  useEffect( () => {
    const fetchdata = async()=>{
    const response = await fetch("http://localhost:8057/allproducts",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const respdata= await response.json()
         setProducts(respdata);
         setFilteredProducts(respdata);
  }
  fetchdata()
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() === "") {
      setFilteredProducts(products);
      setShowNoMatchCard(false);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(filtered);
      setFilteredProducts(filtered);
      setShowNoMatchCard(filtered.length === 0);
    }

    if (filteredProducts.length > 0) {
      const firstMatchedProduct = document.querySelector(".product-card");
      if (firstMatchedProduct) {
        firstMatchedProduct.scrollIntoView({ behavior: "smooth" });
      }
    } else if (noMatchCardRef.current) {
      noMatchCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchInput(query);
    setTimeout(() => {
      handleSearch();
    }, 1000);
  };

  return (
    <div>
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
                flexGrow: 1,
                fontFamily: "unset",
                color: "grey",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <span className="head-title">{typedText}</span>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#eeb03d" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for products..."
                inputProps={{ "aria-label": "search" }}
                onChange={handleInputChange}
                value={searchInput}
              />
            </Search>
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
                  <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
                    Inventory
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
        Product Catalog
      </Typography>
      <div className="centered-container">
        <div className="product-card-container">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.title.length+product.image.length+product.quantity+product.price}
              product={product}
            />
          ))}
        </div>
        {showNoMatchCard && (
          <Card
            ref={noMatchCardRef}
            className="product-card no-match-card"
            sx={{
              width: "100%",
              padding: "2rem",
              background:
                "linear-gradient(to right, rgba(238, 176, 61, 0.5), rgba(194, 118, 63, 0.5), rgba(135, 72, 57, 0.5), rgba(69, 37, 39, 0.5), rgba(0, 0, 0, 0.5))",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
              animation: "fadeIn 1s ease-in-out",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="product-title"
                sx={{
                  fontFamily: "monospace",
                  fontSize: "24px",
                  textAlign: "center",
                  opacity: 0,
                  animation: "fadeInText 3s ease-in-out forwards",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  color: "black",
                  WebkitTextStroke: "0.5px black",
                }}
              >
                No Items matched your Search !! 😔🔍
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
export default ProductCatalogue;
