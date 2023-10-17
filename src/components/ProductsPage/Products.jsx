import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useAuth } from "../AuthPages/useAuth";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import logo from "../HomePage/Headers/header.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Footer from "../HomePage/Footers/Footer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "./Products.css";
import Faqs from "../LandingPage/Faqs";

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
  const [cartQuantity, setCartQuantity] = useState(1);
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const handleQuantityChange = (event) => {
    setCartQuantity(event.target.value);
  };
  const addToCart = (product) => {
   //console.log(product)
    const cartItemDTO = {
      productId: product.id,
      quantity: cartQuantity,
      price: product.price
    };
    //console.log(cartItemDTO)
    axios
      .post("http://localhost:8057/cart/add", cartItemDTO, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.info(`${product.title} added to the cart 😉`);
          setCartQuantity(1);
        } else {
          toast.error("Failed to add item to the cart");
        }
      })
      .catch((error) => {
        console.error("Error adding item to the cart:", error);
        toast.error("An error occurred while adding item to the cart");
      });
  };

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
            M.R.P:<s>{price + 123}</s>
          </span>
          <span className="tail"> (84%off)</span>
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="product-rating">{generateStars(3)}</div>
          <div className="product-quantity">
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              value={cartQuantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </div>
          <Tooltip
            TransitionComponent={Zoom}
            placement="left-start"
            title="Add to cart"
          >
            <IconButton
              className="cart-icon2"
              onClick={() => addToCart(product)}
              sx={{
                color: "#eeb03d",
                marginTop: "21px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                transition: "color 0.3s, background-color 0.3s",
                "&:hover": {
                  color: "rgba(0, 0, 0, 0.7)",
                  backgroundColor: "#eeb03d",
                },
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
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

const Products = () => {
  const [typedText, setTypedText] = useState("");
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showNoMatchCard, setShowNoMatchCard] = useState(false);
  const noMatchCardRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: location.state ? location.state.existingUser.name : "",
    country: location.state ? location.state.existingUser.country : "",
    email: location.state ? location.state.existingUser.email : "",
    contact: location.state ? location.state.existingUser.contact : "",
  });
  const [isEditing, setIsEditing] = useState(false);
  //console.log(location.state)
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("http://localhost:8057/user/allproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const respdata = await response.json();
      setProducts(respdata);
      setFilteredProducts(respdata);
    };
    fetchdata();
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const handleSearch = () => {
    if (searchInput.trim() === "") {
      setFilteredProducts(products);
      setShowNoMatchCard(false);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
      );
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

  const handleEditProfile = () => {
    setIsEditing(true);
    setIsProfileDialogOpen(true);
  };

  const renderProfileDialog = () => {
    return (
      <Dialog
        open={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
      >
        <DialogTitle>View Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click "Edit" to update your profile information:
          </DialogContentText>
          <TextField
            sx={{
              marginTop: "20px",
            }}
            label="Username"
            fullWidth
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            disabled={!isEditing}
          />
          <TextField
            sx={{
              marginTop: "20px",
            }}
            label="Email"
            fullWidth
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            disabled
          />
          <TextField
            sx={{
              marginTop: "20px",
            }}
            label="Contact"
            fullWidth
            value={userData.contact}
            onChange={(e) =>
              setUserData({ ...userData, contact: e.target.value })
            }
            disabled={!isEditing}
          />
          <TextField
            sx={{
              marginTop: "20px",
            }}
            label="Country"
            fullWidth
            value={userData.country}
            onChange={(e) =>
              setUserData({ ...userData, country: e.target.value })
            }
            disabled
          />
          {/* <TextField
            sx={{
              marginTop: "20px",
            }}
            label="No. of Purchases"
            fullWidth
            value={location.state.user.boughtProducts.length}
            disabled // Always disabled for "No. of Purchases"
          /> */}
        </DialogContent>
        <DialogActions>
          {!isEditing && <Button onClick={handleEditProfile}>Edit</Button>}
          {isEditing && (
            <>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button onClick={() => setIsProfileDialogOpen(false)}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const handleSaveChanges = async () => {
    const updatedUserData = {
      ...userData,
    };
    axios
      .put("http://localhost:8057/update", updatedUserData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        timeout: 15000,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("User updated Successfully");
          setIsProfileDialogOpen(false);
          setIsEditing(!isEditing);
        } else {
          toast.error("Failed to update user");

          setIsEditing(!isEditing);
        }
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          toast.success("User updated Successfully");
          setIsProfileDialogOpen(false);
          setIsEditing(!isEditing);
        } else {
          toast.error("Failed to update user");
          setIsEditing(!isEditing);
        }
      });
  };

  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    let sortedProducts = [...filteredProducts];

    if (sortOption === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  const handleClearFilter = () => {
    setFilteredProducts(products);
    setSearchInput("");
    setSelectedSortOption("");
  };

  const handleCartClick = () => {
    navigate("/cart-page", { state: { userData } });
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
            <Tooltip
              TransitionComponent={Zoom}
              placement="bottom"
              title="View cart"
            >
              <IconButton
                className="cart-icon"
                sx={{
                  backgroundColor: "#eeb03d",
                  borderRadius: "50%",
                  padding: "8px",
                  color: "black",
                }}
                onClick={handleCartClick}
              >
                <ShoppingCartIcon sx={{ fontSize: "24px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              TransitionComponent={Zoom}
              placement="bottom"
              title="View Profile"
            >
              <IconButton
                className="profile-icon"
                sx={{
                  backgroundColor: "#eeb03d",
                  borderRadius: "50%",
                  padding: "8px",
                  color: "black",
                  marginLeft: "20px",
                }}
                onClick={() => {
                  setIsProfileDialogOpen(!isProfileDialogOpen);
                }}
              >
                <ManageAccountsIcon sx={{ fontSize: "24px" }} />
              </IconButton>
            </Tooltip>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                className="button"
                sx={{
                  color: "black",
                  backgroundColor: "#eeb03d",
                  marginLeft: "15px",
                }}
                onClick={() => {
                  localStorage.removeItem("token");
                  logout();
                  toast.success("Signed Out successfully!!", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "colored",
                  });
                }}
              >
                <ExitToAppIcon />
                <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
                  Sign out
                </Typography>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      {isProfileDialogOpen ? renderProfileDialog() : <></>}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "20px",
          marginRight: "20px",
        }}
      >
        <label
          htmlFor="sort"
          style={{
            fontFamily: "sans-serif",
            marginRight: "10px",
            color: "black",
          }}
        >
          Sort By:
        </label>
        <select
          id="sort"
          name="sort"
          onChange={(event) => {
            handleSortChange(event);
            setSelectedSortOption(event.target.value);
          }}
          value={selectedSortOption}
          style={{
            padding: "8px",
            backgroundColor: "transparent",
            border: "1px solid #eeb03d",
            color: "black",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="lowToHigh">Price Low to High</option>
          <option value="highToLow">Price High to Low</option>
        </select>

        <Button
          className="button"
          sx={{
            color: "black",
            backgroundColor: "#eeb03d",
            marginLeft: "15px",
            "&:hover": {
              color: "#eeb03d",
              backgroundColor: "black",
            },
          }}
          onClick={handleClearFilter}
        >
          Clear Filter
        </Button>
      </div>

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
        Our Products
      </Typography>
      <div className="centered-container">
        <div className="product-card-container">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
      <Faqs />
      <Footer />
    </div>
  );
};
export default Products;
