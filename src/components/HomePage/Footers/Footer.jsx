import React from "react";
import { Grid, Typography, Container, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import logo from "../Headers/header.png"; // Import your company logo image

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundImage:
            "linear-gradient(to bottom, #ecd8cb, #ad9c96, #716563, #393334, #000000)",
          maxWidth: "100%",
          color: "white",
          marginTop: "40px",
          alignItems: "center", // Align items vertically
        }}
      >
        <Grid container spacing={3} style={{ flex: 1 }}>
          <Grid item xs={12} sm={4}>
            <div className="connect">
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "fantasy",
                  background: "black",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginBottom: "5px",
                  marginTop: "20px",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <u>Connect with us</u>
              </Typography>
            </div>
            <div className="connect-icon">
              <IconButton className="cicon" style={{ color: "#eeb03d" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton className="cicon" style={{ color: "#eeb03d" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton className="cicon" style={{ color: "#eeb03d" }}>
                <InstagramIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="logo-container">
              <img src={logo} alt="Company Logo" className="company-logo" />
              <Typography
                variant="subtitle1"
                className="slogan"
                sx={{
                  fontFamily: "cursive",
                  background: "white",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginBottom: "5px",
                  marginTop: "20px",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <u>"Where freshness meets Convenience"</u>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="contact-us">
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "fantasy",
                  background: "black",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginBottom: "5px",
                  marginTop: "20px",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <u>Contact us</u>
              </Typography>
              <IconButton className="icon" style={{ color: "#eeb03d" }}>
                <EmailIcon />
              </IconButton>
              <Typography
                variant="body2"
                className="slogan"
                sx={{
                  fontFamily: "cursive",
                  background: "white",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginTop: "20px",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Email: vimalraj.s@iamneo.ai
              </Typography>
              <Typography
                variant="body2"
                className="slogan"
                sx={{
                  fontFamily: "cursive",
                  background: "white",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginBottom: "5px",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Phone: +91 (760) 491-2953
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
