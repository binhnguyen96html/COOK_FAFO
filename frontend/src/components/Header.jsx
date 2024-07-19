import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="fixed w-full z-50 top-0 start-0">
        <div className="md:grid grid-cols-4 items-center justify-start gap-4 px-8 py-2 border-b shadow-sm bg-white">
          <div className="col-span-1">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/img/cooking_logo.png"
                className="h-14"
                alt="cooking Logo"
              />
              <span className="self-center text-2xl text-green-800 font-semibold whitespace-nowrap">
                COOK-FAFO
              </span>
            </Link>
          </div>

          <div
            className="col-span-2 flex items-center md:justify-center gap-8 mt-2 md:mt-0
          text-green-800 font-semibold"
          >
            <Link to="/">
              <p className="hover:text-green-500 duration-75 transition-colors">
                Home
              </p>
            </Link>

            <p className="">All Menus</p>

            <Link to="/products-list-page">
              <p className="hover:text-green-500 duration-75 transition-colors">
                All Product
              </p>
            </Link>
          </div>

          <div className="col-span-1"></div>
        </div>
      </nav>
    </>
  );
};

export default Header;
