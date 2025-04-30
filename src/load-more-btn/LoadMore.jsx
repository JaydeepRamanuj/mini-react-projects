import { useEffect, useState } from 'react';
import ProductCard from './Product-card';

function LoadMore() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // let totalProductAmount = useRef(10);
  // let skipProductsAmount = useRef(0);
  let [totalProductAmount, setTotalProductAmount] = useState(10);
  let [skipProductsAmount, setSkipProductsAmount] = useState(0);
  async function getProductData() {
    setIsLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=${totalProductAmount}&skip=${skipProductsAmount}`
    );
    let result = await response.json();

    setProductList([...result.products]);
    setIsLoading(false);
  }

  // function getMoreProducts() {
  //   // console.log(totalProductAmount.current);
  //   if (totalProductAmount.current < 100) {
  //     totalProductAmount.current += 10;
  //     getProductData();
  //   }
  // }

  // function getNextProductList() {
  //   if (skipProductsAmount.current < 100) {
  //     skipProductsAmount.current += 10;
  //     getProductData();
  //   }
  // }

  useEffect(() => {
    getProductData();
  }, [totalProductAmount, skipProductsAmount]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2">
        <span className="text-xl"> Loading...</span>
        <span className="block h-4 w-4 rounded-full border-2 animate-spin border-slate-300 border-t-slate-800"></span>
      </div>
    );
  }

  return (
    <>
      <div className="product-list grid grid-cols-4 gap-4 justify-center">
        {productList.map((product, index) => (
          <ProductCard
            key={index}
            url={product.thumbnail}
            price={product.price}
            title={product.title}
            rating={product.rating}
            reviewsCount={product.reviews.length}
          />
        ))}
      </div>
      {totalProductAmount.current == 100 && (
        <b className="block text-red-500 m-4">Card limit reached</b>
      )}
      <div
        className="btn inline-block  w-fit mx-auto mt-10 px-4 py-2 rounded active:scale-95 text-white text-center bg-blue-500 active:bg-blue-600 hover:bg-blue-600 "
        // onClick={getMoreProducts}
        onClick={() => {
          setTotalProductAmount((prev) => prev + 10);
        }}
      >
        Load 10 more Products
      </div>
      <div
        className="btn inline-block w-fit ml-6 mx-auto mt-10 px-4 py-2 rounded active:scale-95 text-white text-center bg-teal-500 active:bg-teal-600 hover:bg-teal-600 "
        // onClick={getNextProductList}
        onClick={() => {
          setSkipProductsAmount((prev) => (prev += 10));
        }}
      >
        Load next 10 Products
      </div>
    </>
  );
}

export default LoadMore;
