import React from "react";
import Swiper from "react-id-swiper";
import { useWindowSize } from "@react-hook/window-size";
import "swiper/css/swiper.css"

import "./Gallery.css"


export const Gallery = ({ title, images }) => {
    const [width] = useWindowSize();

    const params = {
        slidesPerView: width > 768 ? 3 : 1,
        spaceBetween: 24,
        pagination: {
            el: ".swiper-pagination",
            clickable: false,
        },
        navigation: {
            nextEl: ".gallery__button-right",
            prevEl: ".gallery__button-left"
        },
        renderPrevButton: () => Button("prev"),
        renderNextButton: () => Button("next"),
    };

    function Button(type) {
        return (
            <svg className={`${type === "prev"
                ? "gallery__button-left"
                : "gallery__button-right"} gallery__button`}
                 width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.9992 0C7.17884 0.00159992 0.00159992 7.17884 0 16.0008C0 24.8228 7.17724 32 16.0008 32C24.8228 31.9984 32 24.8212 32 16.0008C32 7.17884 24.8228 0.00159992 15.9992 0ZM16.0008 28.8002C8.94195 28.8002 3.19984 23.058 3.19984 16.0008C3.20144 8.94355 8.94355 3.20144 15.9992 3.19984C23.058 3.20144 28.8002 8.94355 28.8002 16.0008C28.8002 23.0564 23.058 28.7986 16.0008 28.8002Z"/>
                <path d="M16.02 9.59302L9.6123 16.0007L16.02 22.4068V17.6006H22.4101V14.4008H16.02V9.59302Z"/>
            </svg>
        );
    }

    return (
        <div className="gallery">
            <h1 className="gallery__title">{title}</h1>
            <Swiper {...params}>
                {images.map((image, index) => (
                    <img alt="gallery-img" className={"gallery__img"} key={index} src={image}/>
                ))}
            </Swiper>
        </div>
    );
};
