import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { openDB } from 'idb';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import emptycart from '../../Assets/empty-cart.png'
import CardMedia from '@mui/material/CardMedia';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../HomePage/Headers/header.png';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import './CartPage.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const ProductCard = ({ product, removeFromCart }) => {
  const { id, title, price, description, images } = product;

  return (
    <Card
      className="product-card"
      sx={{
        background:
          'linear-gradient(to top, #eeeeee, #ebe6eb, #ecdde3, #eed5d5, #ebcec3, #ebcebb, #e8cfb4, #e2d0ae, #e8d4af, #edd8af, #f3ddb0, #f8e1b0)',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardMedia className="product-image" image={images[2]} title={title} children={<div></div>}/>
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
          <span className="head"> M.R.P:<s>{price + 123}</s></span>
          <span className="tail"> (84%off)</span>
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="product-rating">
            {generateStars(3)}
          </div>
          <Tooltip TransitionComponent={Zoom} placement="left-start" title="Remove">
          <IconButton
            className='cart-icon'
            onClick={() => removeFromCart(id)}
            sx={{ color: 'black', marginTop:'21px' }}
          >
            <RemoveShoppingCartIcon />
          </IconButton>
          </Tooltip>
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
      starIcons.push(<span key={i} className="star-icon gold">&#9733;</span>);
    } else {
      starIcons.push(<span key={i} className="star-icon gold">&#9734;</span>);
    }
  }
  return starIcons;
};

const CartPage = () => {
    const [typedText, setTypedText] = useState('');
    const fullText = "\u00A0\u00A0\u00A0Your Grocery Delivery Partner . . . . . . . . . . ";
    const delay = 75;
    const [effVar, setEffVar] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [cart, setCart] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Add this line
    const [showNoMatchCard, setShowNoMatchCard] = useState(false); // Add this line
    const noMatchCardRef = useRef(null);

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
    const fetchCartItems = async () => {
      try {
        const db = await openDB('GroceryDB2', 1);
        const transaction = db.transaction('carts', 'readonly');
        const cartStore = transaction.objectStore('carts');
        const cartItems = await cartStore.getAll();
        setCart(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const db = await openDB('GroceryDB2', 1);
      const transaction = db.transaction('carts', 'readwrite');
      const cartStore = transaction.objectStore('carts');
      await cartStore.delete(productId);
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      toast.info(`Item removed from the cart 🙂`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setFilteredProducts(cart);
      setShowNoMatchCard(false);
    } else {
      const filtered = cart.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowNoMatchCard(filtered.length === 0);
    }

    if (filteredProducts.length > 0) {
      const firstMatchedProduct = document.querySelector('.product-card');
      if (firstMatchedProduct) {
        firstMatchedProduct.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (noMatchCardRef.current) {
      noMatchCardRef.current.scrollIntoView({ behavior: 'smooth' });
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
        <AppBar position="static" sx={{ backgroundColor: 'black', height: '100px' }}>
          <Toolbar sx={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: '#eeb03d' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for products..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInputChange}
                value={searchInput}
              />
            </Search>
            <Link to="/products" style={{ textDecoration: 'none' }}>
            <Button className='button' sx={{ color: 'black', backgroundColor: '#eeb03d' }}>
                <ShoppingCartIcon />
                <Typography variant="body2" sx={{ paddingLeft: '8px' }}>Go to Grocery</Typography>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      {cart.length>=1 ? <Typography
    variant="h4"
    sx={{
      fontFamily: 'fantasy',
      backgroundImage: 'linear-gradient(to left bottom, #eeb03d, #c2763f, #874839, #452527, #000000)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      marginBottom: '5px',
      marginTop: '20px',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    }}>
    Your Cart
  </Typography> : <Typography
    variant="h4"
    sx={{
      fontFamily: 'fantasy',
      backgroundImage: 'linear-gradient(to left bottom, #eeb03d, #c2763f, #874839, #452527, #000000)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      marginBottom: '5px',
      marginTop: '20px',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    }}>
    Your Cart is Empty
  </Typography>}
      <div className="centered-container">
        <div className="product-card-container">
          {cart.length>=1 ? cart.map((product) => (
            <ProductCard key={product.id} product={product} removeFromCart={removeFromCart} />
          )) :   <div><img src={emptycart}/></div>}
        </div>
        {showNoMatchCard && (
          <Card
            ref={noMatchCardRef}
            className="product-card no-match-card"
            sx={{ width: '100%', padding: '2rem' }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className="product-title">
                No Items matched your Search !!
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CartPage;
