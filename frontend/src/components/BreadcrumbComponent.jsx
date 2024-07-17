import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export const BreadcrumbComponent = ({category}) => {
  return (
    <>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Link to="/">
          <BreadcrumbItem icon={HiHome}>Home</BreadcrumbItem>
        </Link>

        <BreadcrumbItem>
          <p>{category}</p>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
