import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "./header.png";
import "./AuthHeader.css";
import { Link } from "react-router-dom";

export default function AuthHeader() {
  const [typedText, setTypedText] = useState("");
  const fullText =
    "\u00A0\u00A0\u00A0Your Grocery Delivery Partner . . . . . . . . . . ";
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
              color: "grey",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <span className="head-title">{typedText}</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
