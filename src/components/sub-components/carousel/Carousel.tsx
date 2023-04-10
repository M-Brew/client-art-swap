import React, { useEffect, useRef } from "react";

export const Carousel = (props: ICarousel) => {
  const { images } = props;

  useEffect(() => {
    initFlickity();
  }, []);

  const carousel = useRef(null);

  async function initFlickity() {
    if (typeof window !== "undefined" && carousel.current) {
      const Flickity = (await import("flickity")).default;
      new Flickity(carousel.current, {
        lazyLoad: true,
        wrapAround: true,
        autoPlay: true,
        prevNextButtons: false,
        pageDots: false,
      });
    }
  }

  return (
    <div ref={carousel}>
      {images.map((image, idx) => (
        <div key={idx} style={{ height: "80vh", margin: "0 0.5rem" }}>
          <img
            src={image}
            alt="carousel-img"
            style={{ height: "100%", width: "auto", borderRadius: "5px" }}
          />
        </div>
      ))}
    </div>
  );
};

interface ICarousel {
  images: string[];
}
