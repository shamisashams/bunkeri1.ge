import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import { ProductBox } from "../ProductBox/ProductBox";
import "./ProductSlider.css";
import { NextSlide, PrevSlide } from "../Buttons/Buttons";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Pagination, Navigation]);

const ProductSlider = ({ data, head, rightBtns, showArrows, handleClick }) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (
        <div className="product_slider">
            <div className="flex head">
                <div className="title35 blue">{head}</div>
                {rightBtns ? (
                    <div className="right_btns flex">
                        {rightBtns.map((button, i) => {
                            return <div key={i}>{button}</div>;
                        })}
                    </div>
                ) : (
                    ""
                )}
            </div>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onSwiper={(swiper) => {
                    // Delay execution for the refs to be defined
                    setTimeout(() => {
                        // Override prevEl & nextEl now that refs are defined
                        swiper.params.navigation.prevEl =
                            navigationPrevRef.current;
                        swiper.params.navigation.nextEl =
                            navigationNextRef.current;

                        // Re-init navigation
                        swiper.navigation.destroy();
                        swiper.navigation.init();
                        swiper.navigation.update();
                    });
                }}
                pagination={{
                    type: "progressbar",
                }}
                grabCursor
                loop
                slidesPerView={6}
                // style={{ height: "220px" }}
                breakpoints={{
                    1500: {
                        slidesPerView: 6,
                    },
                    1300: {
                        slidesPerView: 5,
                    },
                    1000: {
                        slidesPerView: 4,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    450: {
                        slidesPerView: 2,
                    },
                    200: {
                        slidesPerView: 1,
                    },
                }}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <ProductBox
                                link={route("client.product.show", item.slug)}
                                img={
                                    item.latest_image != null
                                        ? "/" +
                                          item.latest_image.path +
                                          "/" +
                                          item.latest_image.title
                                        : null
                                }
                                title={item.title}
                                price={
                                    item.special_price !== null
                                        ? item.special_price
                                        : item.price
                                }
                                sale={
                                    item.special_price !== null ? true : false
                                }
                                new={item.new}
                                product={item}
                                handleClick={handleClick}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className="flex centered slidebtns">
                <div ref={navigationPrevRef}>
                    <PrevSlide />
                </div>
                <div ref={navigationNextRef}>
                    <NextSlide />
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;
