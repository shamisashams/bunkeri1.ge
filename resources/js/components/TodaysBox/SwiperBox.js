import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AddToCart, NextSlide, PrevSlide } from "../Buttons/Buttons";
import "./TodaysBox.css";
import { usePage } from "@inertiajs/inertia-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Pagination, Navigation]);

const SwiperBox = ({ data, addTocart, buyNow }) => {
    const sharedData = usePage().props.localizations;
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div className="box">
            <div className="flex head">
                <div className="title35">
                    {__("client.today_product", sharedData)}
                </div>
            </div>
            <div className="flex centered slidebtns">
                <div ref={navigationPrevRef}>
                    <PrevSlide />
                </div>
                <div ref={navigationNextRef}>
                    <NextSlide />
                </div>
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
                slidesPerView={2}
                // style={{ height: "220px" }}
                breakpoints={{
                    1150: {
                        slidesPerView: 2,
                    },
                    200: {
                        slidesPerView: 1,
                    },
                }}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide className="inbox_slider" key={index}>
                            <div className="img">
                                <img
                                    src={
                                        item.latest_image != null
                                            ? "/" +
                                              item.latest_image.path +
                                              "/" +
                                              item.latest_image.title
                                            : null
                                    }
                                    alt=""
                                />
                            </div>
                            <strong>{item.title}</strong>
                            <p className="op05">{item.short_description}</p>
                            <div className="flex centered">
                                <div className="blue">
                                    {item.special_price !== null
                                        ? item.special_price.toFixed(2)
                                        : item.price.toFixed(2)}{" "}
                                    ლარი
                                </div>
                                {item.special_price !== null ? (
                                    <div className="old_price">
                                        {item.price.toFixed(2)} ლარი
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex btns centered">
                                <AddToCart onClick={() => addTocart(item)} />
                                <button
                                    onClick={() => buyNow(item)}
                                    className="common_btn"
                                >
                                    {__("client.today_product_buy", sharedData)}
                                </button>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default SwiperBox;
