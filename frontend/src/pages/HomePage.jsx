import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
// import cookListData from '../data/cookListData.js';
// import products from '../data/data.js';
import MenuCard from '../components/MenuCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import url from '../url/url.js';

const HomePage = () => {
  const [menusData, setMenusData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/menus`)
      .then((res) => {
        setMenusData(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(
        `${url}/api/products`
      )
      .then((res) => {
        setProductsData(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productsData.length]);

  return (
    <div>
      <div className="">
        <CarouselComponent images={['cover.png', 'cover2.png']} />
      </div>
      <div className="overflow-hidden">
        <div>
          <h1 className="text-green-700 py-3 font-semibold text-2xl">
            Vietnamese Cuisine
          </h1>

          <div className="flex gap-4 h-[480px] hover:overflow-auto scrollbar-thin">
            {menusData.length > 0 ? (
              menusData?.map((menu, idx) => (
                <Link to={`menu-detail/${menu.id}`} key={`menu_${idx}`}>
                  <MenuCard menu={menu} />
                </Link>
              ))
            ) : (
              <div>No Menus</div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-green-700 py-3 font-semibold text-2xl">
            Products
          </h1>

          <div className="flex gap-4 h-[480px] hover:overflow-auto scrollbar-thin">
            {productsData.length > 0 &&
              productsData?.map((product, idx) => (
                <Link to={`/products-list-page`} key={`product_${idx}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
