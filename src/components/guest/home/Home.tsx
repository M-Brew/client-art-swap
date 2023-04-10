import React from "react";

import { Carousel } from "components/sub-components/carousel/Carousel";

const image1 =
  "https://images.unsplash.com/photo-1680738497538-10fd2102b766?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80";
const image2 =
  "https://images.unsplash.com/photo-1680736957060-61a1dfb8d046?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80";
const image3 =
  "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80";
const image4 =
  "https://images.unsplash.com/photo-1680790515529-6a9278b541ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
const image5 =
  "https://images.unsplash.com/photo-1680820855569-32005cb8836c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80";
const image6 =
  "https://images.unsplash.com/photo-1680346129364-d12dabff7214?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

export const Home = () => {
  const landingImages = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="py-3">
      <Carousel images={landingImages} />
    </div>
  );
};
