import React from 'react';
import { Link } from 'react-router-dom';

const MenuCard = ({ menu }) => {
  return (
    <>
      <Link to={`menu-detail/${menu._id}`}>
        <div
          className=" bg-white border border-gray-200 rounded-lg shadow
         w-80 h-[450px] grid grid-rows-2"
        >
          <div className="rounded-t-lg overflow-hidden h-50">
            <img
              src={`/img/${menu.image[0]}`}
              alt="img"
              className="hover:scale-105 duration-75 transition-all h-full object-cover"
            />
          </div>

          <div className="p-5 overflow-hidden">
            <h3 className="mb-2 text-xl font-bold  text-gray-900 line-clamp-2">
              {menu.name}
            </h3>

            <p className="mb-3 font-normal text-gray-700 line-clamp-5 tracking-tight">
              {menu.description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MenuCard;
