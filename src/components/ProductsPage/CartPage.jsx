import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ShopIcon from "@mui/icons-material/Shop";
import CardContent from "@mui/material/CardContent";
import emptycart from "../../Assets/empty-cart.png";
import CardMedia from "@mui/material/CardMedia";
import PurchaseForm from "./PurchaseForm";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../HomePage/Headers/header.png";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Footer from "../HomePage/Footers/Footer";

const ProductCard = ({ product, removeFromCart, quantity }) => {
  const { id, title, price, description, image } = product;

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip
              TransitionComponent={Zoom}
              placement="left-start"
              title="Quantity"
            >
              <IconButton
                className="cart-icon"
                sx={{
                  height: "40px",
                  width: "40px",
                  color: "#eeb03d",
                  marginTop: "21px",
                  marginLeft: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  transition: "color 0.3s, background-color 0.3s",
                  "&:hover": {
                    color: "rgba(0, 0, 0, 0.7)",
                    backgroundColor: "#eeb03d",
                  },
                }}
              >
                {quantity}
              </IconButton>
            </Tooltip>
            <Tooltip
              TransitionComponent={Zoom}
              placement="right-start"
              title="Remove"
            >
              <IconButton
                className="cart-icon"
                onClick={() => removeFromCart(id)}
                sx={{
                  color: "#eeb03d",
                  marginTop: "21px",
                  marginLeft: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  transition: "color 0.3s, background-color 0.3s",
                  "&:hover": {
                    color: "rgba(0, 0, 0, 0.7)",
                    backgroundColor: "#eeb03d",
                  },
                }}
              >
                <RemoveShoppingCartIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
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

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.state)
  const [existingUser, setExistingUser] = useState({
    name: "",
    country: "",
    email: "",
    contact: "",
  });
  //console.log(existingUser)
  const [typedText, setTypedText] = useState("");
  const fullText =
    "\u00A0\u00A0\u00A0Your Grocery Delivery Partner . . . . . . . . . . ";
  const delay = 75;
  const [effVar, setEffVar] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

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

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    fetch("http://localhost:8057/cart/get", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        //console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  useEffect(() => {
    const calculatedTotalPrice = cart.reduce(
      (total, product) =>
        total + parseFloat(product.product.price) * product.quantity,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cart]);

  const removeFromCart = (cartItemId) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart(updatedCart);
    fetch(`http://localhost:8057/cart/remove/${cartItemId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to remove item from cart.");
        }
      })
      .then(() => {
        toast.info(`Item removed from the cart 🙂`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  const handleFormOpen = () => {
    setShowForm(true);
  };

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleProductSelect = (event) => {
    const productId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = users.find((u) => u.email === selectedUser);

    if (user) {
      user.boughtProducts = user.boughtProducts || [];
      user.boughtProducts.push(...selectedProducts);
      localStorage.setItem("users", JSON.stringify(users));
    }

    setSelectedUser("");
    setSelectedProducts([]);
    setShowForm(false);

    toast.success(`Products purchased successfully! 🛒`, {
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

  const handleGroceryClick = () => {
    const existingUser = location.state.userData;
    //setExistingUser(existingUser);
    navigate("/products", { state: { existingUser } });
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
              <Button
                onClick={handleGroceryClick}
                className="button"
                sx={{
                  color: "black",
                  backgroundColor: "#eeb03d",
                  marginLeft: "16px",
                }}
              >
                <ShoppingCartIcon />
                <Typography variant="body2" sx={{ paddingLeft: "8px" }}>
                  Go to Grocery
                </Typography>
              </Button>
            {cart.length >= 1 ? (
              <Button
                className="button"
                sx={{
                  color: "black",
                  backgroundColor: "#eeb03d",
                  marginLeft: "16px",
                }}
                onClick={() => setShowForm(!showForm)}
              >
                <ShopIcon sx={{ fontSize: "20px" }} />
                <Typography variant="body2" sx={{ paddingLeft: "8px" }}>
                  Purchase
                </Typography>
              </Button>
            ) : (
              <></>
            )}

            {cart.length >= 1 && (
              <div>
                <Button
                  className="button"
                  sx={{
                    color: "black",
                    backgroundColor: "#eeb03d",
                    marginLeft: "16px",
                  }}
                >
                  <CurrencyRupeeIcon />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      paddingLeft: "5px",
                      fontSize: "20px",
                      paddingRight: "5px",
                    }}
                  >
                    <strong>{totalPrice.toFixed(2)}</strong>
                  </Typography>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {cart.length >= 1 ? (
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
          Your Cart
        </Typography>
      ) : (
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
          Your Cart is Empty
        </Typography>
      )}
      <div className="centered-container">
        <div className="product-card-container">
          {cart.length >= 1 ? (
            cart.map((item) => (
              <ProductCard
                key={item.cartItemId}
                product={item.product}
                quantity={item.quantity}
                removeFromCart={removeFromCart}
              />
            ))
          ) : (
            <div className="mt-image">
              <img src={emptycart} alt="Empty Cart" />
            </div>
          )}
        </div>
        <div className="purchase-form">
          {showForm && (
            <PurchaseForm
              selectedUser={selectedUser}
              handleUserSelect={handleUserSelect}
              cart={cart}
              handleProductSelect={handleProductSelect}
              handleSubmit={handleSubmit}
              users={users}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
