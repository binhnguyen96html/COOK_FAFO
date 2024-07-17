
import React from "react";
// import cooking_logo from "../assets/images/cooking_logo.png";
import { Link } from "react-router-dom";
// import { Dropdown, DropdownItem } from "flowbite-react";
// import Badge from "./Badge";

const Header = () => {
  return (
    <>
    <nav className="fixed w-full z-20 top-0 start-0">
      <div className="flex flex-wrap items-center justify-start gap-4 px-8 py-2 border-b shadow-sm bg-white">
        {/* Logo  */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src='/img/cooking_logo.png'
            className="h-14"
            alt="cooking Logo"
          />
          <span className="self-center text-2xl text-green-800 font-semibold whitespace-nowrap">
            COOK-FAFO
          </span>
        </Link>

        {/* Home Button  */}
        {/* <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-amber-700 rounded md:bg-transparent md:text-amber-700 md:p-0 md:dark:text-amber-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
          </ul>
        </div> */}

      </div>
    </nav>
  </>
  )
}

export default Header