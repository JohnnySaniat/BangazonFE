/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { searchProducts } from '../../api/productData';
import ProductCard from '../../components/cards/ProductCard';
import ProductSearchBar from '../../components/searchbars/ProductSearchBar';

export default function Search() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllProducts = () => {
    searchProducts(searchInput, user.uid).then(setFilteredProducts);
  };

  useEffect(() => {
    searchAllProducts();
    return () => {
      setFilteredProducts([]);
    };
  }, [searchInput]);

  return (
    <>
      <div className="text-center my-4">
        <ProductSearchBar className="navSearch" />
        <div className="d-flex flex-wrap">
          {filteredProducts.map((product) => <ProductCard key={product.firebaseKey} productObj={product} onUpdate={searchAllProducts} />)}
        </div>
      </div>
    </>
  );
}
