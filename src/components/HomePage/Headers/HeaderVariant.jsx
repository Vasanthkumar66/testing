import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from './header.png';
import './Header.css';


export default function HeaderVariant() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Your Grocery Delivery Partner !!";
  const delay = 150;
  const [effVar, setEffVar] = useState(true);

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



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black', height: '100px' }}>
        <Toolbar sx={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', alignItems: 'center' }}>
          <img src={logo} style={{ width: "120px" }} alt="Logo" />
          <Typography variant="h7" component="div" sx={{ flexGrow: 1, fontFamily: 'unset', color: 'grey' }}>
            {typedText}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
