import { Carousel } from 'flowbite-react';
import React from 'react';

const CarouselComponent = ({images}) => {

  return (
    <>
      <div className="h-[240px]">
        <Carousel>
          {images.map((img) => (
            <img key={img} src={`/img/${img}`} alt="..." />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CarouselComponent;
