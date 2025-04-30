import { useEffect, useState } from 'react';

function ScrollIndicator() {
  const [items, setItems] = useState([]);
  const [width, setWidth] = useState(0);

  async function getAllProducts() {
    const response = await fetch('https://dummyjson.com/products?limit=1000');
    const result = await response.json();

    setItems(result.products);
  }

  window.addEventListener('scroll', () => {
    getWidthForIndicator();
  });

  let scrollWidth = 0;
  function getWidthForIndicator() {
    let pageHeight = document.documentElement.scrollHeight;
    let PageScrollYOffset = window.pageYOffset;

    let width = (PageScrollYOffset * 100) / pageHeight;
    let currentScrollWidth = Math.floor(width / 10) * 10;

    if (currentScrollWidth !== scrollWidth) {
      setWidth(currentScrollWidth);
      scrollWidth = currentScrollWidth;
    }
  }

  useEffect(() => {
    getAllProducts();

    return () => {
      document.removeEventListener('scroll', getWidthForIndicator);
    };
  }, []);
  return (
    <>
      <div className="indicator-wrapper bg-slate-400 w-full fixed top-3 left-0">
        <div
          className="indicator-line bg-orange-400 h-1 transition-all"
          style={{ width: `${width}%` }}
        ></div>
      </div>
      <ul className="product-list">
        {items.map((item, index) => (
          <li key={index} className="px-4 pt-2 rounded bg-slate-400 mt-1 w-fit">
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ScrollIndicator;
