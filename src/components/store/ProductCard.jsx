import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const ProductCard = ({ product, onPurchase }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.descripcion}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold text-primary">Q{product.price.toFixed(2)}</span>
          <Badge bg={product.stock > 5 ? "success" : product.stock > 0 ? "warning" : "danger"}>
            {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
          </Badge>
        </div>
        <Button 
          variant="primary" 
          className="w-100"
          onClick={() => onPurchase(product)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Comprar ahora" : "Agotado"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;