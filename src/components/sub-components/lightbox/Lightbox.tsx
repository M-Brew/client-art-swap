import {
    faAngleLeft,
    faAngleRight,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export const Lightbox = (props: ILightbox) => {
    const [images, setImages] = useState(props.images);
    const [activeImage, setActiveImage] = useState(props.activeImage);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        if (props.images) {
            setImages(props.images);
        }
    }, [props.images]);

    useEffect(() => {
        setActiveImage(props.activeImage);
        if (props.activeImage) {
            const index = images.findIndex(
                (item) => item._id === activeImage?._id
            );
            setActiveIndex(index);
        }
    }, [props.activeImage, images, activeImage]);

    const handleNext = () => {
        if (activeIndex < images.length - 1) {
            const currentIndex = activeIndex + 1;
            setActiveIndex(currentIndex);
            setActiveImage(images[currentIndex]);
            props.handleSetActiveImage?.(images[currentIndex]);
        }
    };

    const handlePrevious = () => {
        if (activeIndex > 0) {
            const currentIndex = activeIndex - 1;
            setActiveIndex(currentIndex);
            setActiveImage(images[currentIndex]);
            props.handleSetActiveImage?.(images[currentIndex]);
        }
    };

    if (!activeImage) {
        return <div />;
    }

    return (
        <div>
            <div className="lightbox">
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={`/api${activeImage.image}`}
                            alt="lightbox-img"
                        />
                    </div>
                    <div style={{ position: "absolute", top: 0, right: 0 }}>
                        <FontAwesomeIcon
                            icon={faClose}
                            color="white"
                            size={"lg"}
                            className="m-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => props.handleRemoveActiveImage?.()}
                        />
                    </div>
                    <div style={{ position: "absolute", top: "45%", left: 0 }}>
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            color={activeIndex <= 0 ? "grey" : "white"}
                            size={"lg"}
                            className="m-3"
                            style={{ cursor: "pointer" }}
                            onClick={handlePrevious}
                        />
                    </div>
                    <div style={{ position: "absolute", top: "45%", right: 0 }}>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            color={
                                activeIndex >= images.length - 1
                                    ? "grey"
                                    : "white"
                            }
                            size={"lg"}
                            className="m-3"
                            style={{ cursor: "pointer" }}
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ILightbox {
    images: IArtPieceResponse[];
    activeImage?: IArtPieceResponse;
    handleRemoveActiveImage?: () => void;
    handleSetActiveImage?: (image: IArtPieceResponse) => void;
}
