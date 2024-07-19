import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import products from '../data/data.js';
import ProductCard from '../components/ProductCard.jsx';
import CarouselComponent from '../components/CarouselComponent.jsx';
import { BreadcrumbComponent } from '../components/BreadcrumbComponent.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import url from '../url/url.js';

const MenuPage = () => {
  const { id: menu_id } = useParams();
  const [menusData, setMenusData] = useState([]);
  const [menu, setMenu] = useState({});

  useEffect(() => {
    axios
      .get(`${url}/api/menus`)
      .then((res) => {
        setMenusData(res.data);
        // console.log(Object.keys(findMenu))
      })
      .catch((err) => console.error(err));

    let findMenu = menusData.filter((menu) => menu.id === +menu_id)[0];
    if (findMenu) {
      setMenu(findMenu);
      console.log(menu);
    }
    // console.log('check')
  }, [menusData.length, menu_id, menu]);

  // console.log(menu);

  return (
    <>
      <div className="">
        <div className="mb-3">
          {Object.keys(menu).length > 0 && (
            <BreadcrumbComponent category={menu?.category} />
          )}
        </div>

        <div className="md:grid md:grid-cols-6 gap-8">
          <div className="col-span-4">
            {Object.keys(menu).length > 0 && (
              <CarouselComponent images={menu?.image} />
            )}

            <div className="mt-6">
              {Object.keys(menu).length > 0 &&
                menu?.recipes.map((step, i) => (
                  <div className="text-justify mt-2" key={i}>
                    <h5 className="font-semibold text-gray-900 text-sm">
                      Step: {i + 1}
                    </h5>
                    <p className="text-sm text-gray-800">{step}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-12 md:mt-0 col-span-2 rounded-xl bg-slate-100 py-2">
            <div className="h-screen scrollbar-thin overflow-auto flex flex-col items-center ">
              <div
                className="bg-gradient-to-r from-sky-500 to-green-300 
              hover:bg-gradient-to-r hover:from-green-300 hover:to-sky-400 duration-75 transition-colors
              text-white flex items-center gap-2 py-3 px-7 my-2 rounded-lg mb-6"
              >
                <FaStore className="text-2xl" />
                <h6>You can find all ingredients here</h6>
              </div>

              <div>
                {products.map((pro, idx) => (
                  <Link to={`/products-list-page`} key={`product_${idx}`}>
                    <div key={`product_${idx}`} className="mt-2">
                      <ProductCard product={pro} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
