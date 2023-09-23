import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import logo from '../Headers/header.png';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import './Header.css';

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
    width: '100%', // Increase the width as needed
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Your Grocery Delivery Partner !!";
  const delay = 150;
  const [effVar, setEffVar] = useState(true);
  const [searchInput, setSearchInput] = useState(''); // State variable to receive user input

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
    }, 10000);

    return () => {
      clearInterval(toggleInterval);
    };
  }, []);

  const handleSearch = () => {
    // Handle the search query here, e.g., perform a search or update state.
    console.log(`Searching for: ${searchInput}`);
    // You can also call the handleSearch function from Products.jsx if needed.
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchInput(query); // Update the state with user input
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black', height: '100px' }}>
        <Toolbar sx={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', alignItems: 'center' }}>
        <img src={logo} style={{ width: "120px" }} alt="Logo" />
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#eeb03d' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for products..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              value={searchInput}
            />
          </Search>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button className="button" sx={{ color: 'black', backgroundColor: '#eeb03d' }}>
              <LoginIcon />
              <Typography variant="body2" sx={{ paddingLeft: '10px' }}>Login</Typography>
            </Button>
          </Link>

          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button className="button" sx={{ color: 'black', backgroundColor: '#eeb03d', marginLeft: '13px' }}>
              <PersonIcon />
              <Typography variant="body2" sx={{ paddingLeft: '8px' }}>Signup</Typography>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
