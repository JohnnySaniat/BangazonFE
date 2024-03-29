/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { removeProductFromOrder } from '../../api/orderData';

function CartProductCard({ productObj, orderId, onUpdate }) {
  const removeThisProduct = () => {
    if (window.confirm(`Remove ${productObj.productName} from your cart?`)) {
      removeProductFromOrder(orderId, productObj.id)
        .then(() => {
          onUpdate();
        })
        .catch((error) => {
          console.error('Error removing product from order:', error);
        });
    }
  };

  return (
    <Card className="complete-product-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={productObj.image} alt={productObj.productName} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="card-title">{productObj.productName}</Card.Title>
        <Card.Text>${productObj.price}</Card.Text>
        <Button className="user-card-button" variant="danger" onClick={removeThisProduct}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

CartProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    productName: PropTypes.string,
    productType: PropTypes.string,
    image: PropTypes.string,
    typeId: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number,
    sellerId: PropTypes.number,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CartProductCard;
