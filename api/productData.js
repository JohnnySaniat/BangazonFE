const getAllProducts = () => fetch('https://localhost:7086/api/products/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => Object.values(data));

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7086/api/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProduct = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7086/api/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7086/api/products/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getProductOrdersById = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:7086/api/products/${id}/orders`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const searchProducts = (searchValue) => fetch(`https://localhost:7086/api/products/search?searchValue=${searchValue}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => data);

export {
  getSingleProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  getProductOrdersById,
  searchProducts,
};
