import React from "react";
import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Footer from "../HomePage/Footers/Footer";

const NoAuth = () => {
  return (
    <div className="no-auth" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card
        className="product-card no-match-card"
        sx={{
          width: "100%",
          padding: "2rem",
          background:
            "linear-gradient(to right, rgba(238, 176, 61, 0.5), rgba(194, 118, 63, 0.5), rgba(135, 72, 57, 0.5), rgba(69, 37, 39, 0.5), rgba(0, 0, 0, 0.5))",
          color: "#fff",
          borderRadius: "8px",
          boxShadow:
            "0px 2px 10px rgba(0, 0, 0, 0.3)",
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
            }}>
            You're not Authorized to Access this page 😔❌
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoAuth;
