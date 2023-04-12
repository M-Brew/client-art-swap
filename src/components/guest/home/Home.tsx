import React from "react";

import { Carousel } from "components/sub-components/carousel/Carousel";

import home1 from "../../../assets/home-1.jpg";
import home2 from "../../../assets/home-2.jpg";
import home3 from "../../../assets/home-3.jpg";
import home4 from "../../../assets/home-4.jpg";
import home5 from "../../../assets/home-5.jpg";
import home6 from "../../../assets/home-6.jpg";
import home7 from "../../../assets/home-7.jpg";
import home8 from "../../../assets/home-8.jpg";

export const Home = () => {
  const landingImages = [
    home1,
    home2,
    home3,
    home4,
    home5,
    home6,
    home7,
    home8,
  ];

  return (
    <div className="py-3">
      <Carousel images={landingImages} />
    </div>
  );
};
