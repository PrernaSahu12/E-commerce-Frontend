import React, { useEffect,useState } from 'react'
import { getAllProduct } from '../services/productServices'
import ProductList from './ProductList';


function Home() {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async()=>{
      const data = await getAllProduct();
      console.debug("Home fetched products:", data?.length);
      setProducts(data);
        };
        fetchProducts();
    },[]);
  return (
    <div className='p-6'>
      {/* <h1 className='text-2xl font-bold mb-4'>All Products</h1> */}
      <ProductList products={products}/>
    </div>
  )
}

export default Home;
