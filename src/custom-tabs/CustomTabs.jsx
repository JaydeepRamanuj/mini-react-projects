import { useState } from 'react';
import Home from './contents/Home';
import Product from './contents/Product';
import About from './contents/About';
function CustomTabs() {
  const [currentTab, setCurrentTab] = useState('');

  function handleTabChange() {
    switch (currentTab) {
      case 'Home':
        return <Home />;
      case 'Product':
        return <Product />;
      case 'About':
        return <About />;
      default:
        return <p>no content:(</p>;
    }
  }
  return (
    <div className="tabs-container max-w-[500px] mx-auto">
      <div className="tabs flex gap-4 py-2 px-4 bg-slate-400 rounded-t w-fit">
        <div
          className={`tab p-2 rounded bg-slate-600 text-center active:scale-95 text-white ${
            currentTab == 'Home' && 'text-orange-600 text-semibold'
          }`}
          onClick={() => {
            setCurrentTab('Home');
          }}
        >
          Home
        </div>
        <div
          className={`tab p-2 rounded bg-slate-600 text-center active:scale-95 text-white ${
            currentTab == 'Product' && 'text-orange-600 text-semibold'
          }`}
          onClick={() => {
            setCurrentTab('Product');
          }}
        >
          Product
        </div>
        <div
          className={`tab p-2 rounded bg-slate-600 text-center active:scale-95 text-white ${
            currentTab == 'About' && 'text-orange-600 text-semibold'
          }`}
          onClick={() => {
            setCurrentTab('About');
          }}
        >
          About
        </div>
      </div>
      <div className="content bg-slate-400 rounded-b rounded-tr p-4">
        {handleTabChange()}
      </div>
    </div>
  );
}

export default CustomTabs;
