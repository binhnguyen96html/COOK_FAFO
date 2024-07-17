import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import cookListData from '../data/cookListData.js';
import products from '../data/data.js';
import MenuCard from '../components/MenuCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import axios from 'axios';

const HomePage = () => {
  const [menusData, setMenusData] = useState([]);

  useEffect(() => {
    axios.get('https://7ycm0igoz1.execute-api.us-west-1.amazonaws.com/menus')
    .then((res) => {
      setMenusData(res.data);
      console.log(menusData)
    })
    .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="mt-16 py-3 ">
        <CarouselComponent images={['cover.png', 'cover2.png']} />
      </div>
      <div className="overflow-hidden">
        <div>
          <h1 className="text-green-700 py-3 font-semibold text-2xl">
            Vietnamese Cuisine
          </h1>

          {/* {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error</p>
          ) : ( */}
          <div className="flex gap-4 h-[480px] hover:overflow-auto scrollbar-thin">
            {menusData.map((menu, idx) => (
              <MenuCard key={`menu_${idx}`} menu={menu} />
            ))}
          </div>
          {/* )} */}
        </div>

        <div className="mt-6">
          <h1 className="text-green-700 py-3 font-semibold text-2xl">
            Products
          </h1>

          {/* {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error</p>
          ) : ( */}
          <div className="flex gap-4 h-[480px] hover:overflow-auto scrollbar-thin">
            {products.map((product, idx) => (
              <ProductCard key={`product_${idx}`} product={product} />
            ))}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
