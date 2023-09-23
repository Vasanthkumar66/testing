import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './Products.css';

const ProductCard = ({ product }) => {
  const { title, price, description, images } = product;

  return (
    <Card className="product-card">
      <CardMedia className="product-image" image={images[0]} title={title} />
      <CardContent className="product-details">
        <Typography gutterBottom variant="h6" component="div" className="product-title">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="product-description">
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary" className="product-price">
          <strong>${price}</strong> 
        </Typography>
      </CardContent>
    </Card>
  );
};

const ProductsVariant = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API here (e.g., using fetch or axios)
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="centered-container"> {/* Center the cards */}
      <div className="product-card-container"> {/* Use this container to center cards and ensure equal heights */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsVariant;
