import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
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
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import logo from "../HomePage/Headers/header.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import Footer from "../HomePage/Footers/Footer";
import { v4 as uuidv4 } from "uuid";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "./Products.css";
import Faqs from "../LandingPage/Faqs";
import { useLocation } from "react-router-dom";
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

const ProductCard = ({ product, cart, setCart }) => {
  const { title, price, description, image, quantity } = product;

  const addToCart = (product) => {
    const productWithId = { ...product, id: uuidv4() };
    setCart([...cart, productWithId]);
    localStorage.setItem("cart", JSON.stringify([...cart, productWithId]));
    toast.info(`${product.title} added to the cart 😉`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
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
  const fullText =
    "\u00A0\u00A0\u00A0Your Grocery Delivery Partner . . . . . . . . . . ";
  const delay = 75;
  const [effVar, setEffVar] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showNoMatchCard, setShowNoMatchCard] = useState(false);
  const noMatchCardRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [cart, setCart] = useState([]);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: location.state.user.username,
    age: location.state.user.age,
    country: location.state.user.country,
    email: location.state.user.email,
  });
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchdata = async()=>{
      const response = await fetch("http://localhost:8052/allproducts",{
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
    // const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // setCart(storedCart);
    // const localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
    // const mergedProducts = [...localStorageItems];
    // setProducts(mergedProducts);
    // setFilteredProducts(mergedProducts);
    // fetch("https://api.escuelajs.co/api/v1/products")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const localStorageItems =
    //       JSON.parse(localStorage.getItem("items")) || [];
    //     const mergedProducts = [...localStorageItems, ...data];
    //     setProducts(mergedProducts);
    //     setFilteredProducts(mergedProducts);
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //console.log(location);

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

  const handleEditProfile = () => {
    // Populate dialog fields with existing user data
    setUserData({
      username: location.state.user.username,
      age: location.state.user.age,
      country: location.state.user.country,
      email: location.state.user.email,
    });

    setIsEditing(true); // Enable editing when "Edit" button is clicked
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
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            disabled={!isEditing} // Disable if not in editing mode
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
            disabled // Disable if not in editing mode
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
            disabled={!isEditing} // Disable if not in editing mode
          />
          <TextField
            sx={{
              marginTop: "20px",
            }}
            label="No. of Purchases"
            fullWidth
            value={location.state.user.boughtProducts.length}
            disabled // Always disabled for "No. of Purchases"
          />
        </DialogContent>
        <DialogActions>
          {!isEditing && ( // Show "Edit" button if not in editing mode
            <Button onClick={handleEditProfile}>Edit</Button>
          )}
          {isEditing && ( // Show "Save Changes" and "Cancel" buttons in editing mode
            <>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button onClick={() => setIsProfileDialogOpen(false)}>Cancel</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };




  const handleSaveChanges = () => {
    // Find the user with the same email ID in localStorage
    const usersFromLocalStorage =
      JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = usersFromLocalStorage.map((user) => {
      if (user.email === userData.email) {
        // Update user data
        return {
          ...user,
          username: userData.username,
          country: userData.country,
        };
      }
      return user;
    });

    // Update localStorage with the modified data
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("User updated Successfully")
    setIsProfileDialogOpen(false);
    setIsEditing(!isEditing)
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
    navigate("/cart-page");
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
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
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
      <Faqs />
      <Footer />
    </div>
  );
};
export default Products;
