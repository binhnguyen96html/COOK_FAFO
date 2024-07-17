import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Breadcrumb from "../components/BreadcrumbCom";
// import CarouselCom2 from "../components/CarouselCom2";
// import { useGetMenuByIdQuery } from "../slices/api/menuApiSlice";
// import { useGetProductsBasedMenuKeyQuery } from "../slices/api/productApiSlice";
// import Spinner from "../components/Spinner";
// import AlertCom from "../components/AlertCom";
// import ProductCard from "../components/ProductCard";
import { FaStore } from 'react-icons/fa';
// import { addToCart } from "../slices/reducers/cartSlice";
// import { useDispatch} from "react-redux";
// import cookListData from '../data/cookListData.js';
import products from '../data/data.js';
import ProductCard from '../components/ProductCard.jsx';
import CarouselComponent from '../components/CarouselComponent.jsx';
import { BreadcrumbComponent } from '../components/BreadcrumbComponent.jsx';
import axios from 'axios';

const MenuPage = () => {
  // const [menuKeyInput, setMenuKeyInput] = useState('');
  const { id: menu_id } = useParams();
  const [menusData, setMenusData] = useState([]);


  useEffect(() => {
    axios.get('https://7ycm0igoz1.execute-api.us-west-1.amazonaws.com/menus')
    .then((res) => {
      setMenusData(res.data);
      // console.log(menusData)
    })
    .catch((err) => console.error(err));
  }, [menusData.length]);



  // const dispatch = useDispatch();

  // const {
  //   data: menu,
  //   error: menuError,
  //   isLoading: menuIsLoading,
  // } = useGetMenuByIdQuery(cookList_id);

  // useEffect(() => {
  //   if (menu) setMenuKeyInput(menu.menuKey);
  // }, [menu]);

  // const {
  //   data: products,
  //   error: productsError,
  //   isLoading: productsIsLoading,
  // } = useGetProductsBasedMenuKeyQuery(menuKeyInput);

  // console.log(products);

  // const addToCartHandler = (id) => {
  //   dispatch(addToCart(id))
  // }

  // const cartData = useSelector((state) => state.cart)
  // console.log(menu);

  return (
    <>
      <div className="mt-16 py-3">
        <div className="py-3">
         {menusData.length > 0 && <BreadcrumbComponent category={menusData[menu_id]?.category} />}
        </div>

        <div className="md:grid md:grid-cols-6 gap-8">
          <div className="col-span-4">
            {menusData.length > 0 && <CarouselComponent images={menusData[menu_id]?.image} />}

            <div className="mt-6">
              {menusData && 
                menusData[menu_id]?.recipes.map((step, i) => (
                  <div className="text-justify mt-2" key={i}>
                    <h5 className="font-semibold text-gray-900 text-sm">
                      Step: {i + 1}
                    </h5>
                    <p className="text-sm text-gray-800">{step}</p>
                  </div>
                ))}
            </div>
          </div>

          <div
            className="mt-12 md:mt-0 col-span-2 rounded-xl bg-slate-100 py-2"
          >
            {/* {productsIsLoading ? (
                <Spinner />
              ) : productsError ? (
                //how to handle this error
                // <AlertCom err={productsError} />
                <p>Error</p>
              ) : (
                <> */}

            <div className="h-screen scrollbar-thin overflow-auto flex flex-col items-center ">
              <div
                className="bg-gradient-to-r from-red-500 to-green-300 
              hover:bg-gradient-to-r hover:from-green-300 hover:to-red-400 duration-75 transition-colors
              text-white flex items-center gap-2 py-3 px-5 my-2 rounded-3xl"
              >
                <FaStore className="text-2xl" />
                <h6>You can find all ingredients here</h6>
              </div>

              <div>
                {products.map((pro, idx) => (
                  <div key={`product_${idx}`} className="mt-2">
                    <ProductCard
                      product={pro}
                      // clickHandler={addToCartHandler}
                    />
                  </div>
                ))}
              </div>
              {/* </>
              )} */}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default MenuPage;
