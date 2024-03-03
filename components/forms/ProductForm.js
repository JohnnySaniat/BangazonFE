import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../api/productData';
import { getAllProductTypes } from '../../api/productTypeData';

const initialState = {
  productName: '',
  image: '',
  productTypeId: '',
  price: 0,
  quantity: 1,
};

function ProductForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [productTypes, setProductTypes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getAllProductTypes().then(setProductTypes);

    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateProduct(formInput).then(() => window.location.reload());
    } else {
      const payload = { ...formInput, sellerId: user.id };
      createProduct(payload).then(() => window.location.reload());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} a Product</h2>

      <FloatingLabel controlId="productName" label="Product Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Product Name"
          name="productName"
          value={formInput.productName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="image" label="Product Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="productType" label="Product Type">
        <Form.Select
          aria-label="Product Type"
          name="productTypeId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.productTypeId}
          required
        >
          <option value="">Select a Product Type</option>
          {productTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="price" label="Price" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="quantity" label="Quantity" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Quantity"
          name="quantity"
          value={formInput.quantity}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button className="user-card-button" variant="danger" type="submit">{obj.id ? 'Update' : 'Create'} Product</Button>
    </Form>
  );
}

ProductForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    productName: PropTypes.string,
    image: PropTypes.string,
    productTypeId: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;
