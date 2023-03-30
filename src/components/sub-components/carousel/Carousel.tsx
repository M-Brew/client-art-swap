import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import "./carousel.css";

export const Carousel = (props: ICarousel) => {
    const { children, show } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    useEffect(() => {
        setLength(children.length);
    }, [children]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex === length - show) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, length, show]);

    const next = () => {
        if (currentIndex < length - show) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            next();
        }

        if (diff < -5) {
            prev();
        }

        setTouchPosition(null);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {currentIndex > 0 && (
                    <FontAwesomeIcon
                        className="left-arrow"
                        icon={faArrowLeftLong}
                        size="sm"
                        onClick={prev}
                    />
                )}
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`}
                        style={{
                            transform: `translateX(-${
                                currentIndex * (100 / show)
                            }%)`,
                            transitionDuration: "0.5s",
                        }}
                    >
                        {children}
                    </div>
                </div>
                {currentIndex < length - show && (
                    <FontAwesomeIcon
                        className="right-arrow"
                        icon={faArrowRightLong}
                        size="sm"
                        onClick={next}
                    />
                )}
            </div>
        </div>
    );
};

export const CarouselItem = (props: ICarouselItem) => {
    const { height, image } = props;

    return (
        <div
            style={{
                height,
                backgroundColor: "#f8f9fa",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url(${image})`,
            }}
        />
    );
};

interface ICarousel {
    children: React.ReactNode[];
    show: number;
}

interface ICarouselItem {
    image: string;
    height: string | number;
}
