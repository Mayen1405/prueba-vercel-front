import React from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductsList = ({ products, loading, error, onPurchase }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-3">
        {error}
      </Alert>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Alert variant="info" className="my-3">
        No hay productos disponibles en este momento.
      </Alert>
    );
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {products.map(product => (
        <Col key={product.uid}>
          <ProductCard product={product} onPurchase={onPurchase} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductsList;