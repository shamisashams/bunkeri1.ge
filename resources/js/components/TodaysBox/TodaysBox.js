import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TodaysBox.css";
import SwiperBox from "./SwiperBox";

const TodaysBox = ({ addTocart, buyNow, data1, data2 }) => {
    return (
        <div className="todays_boxes flex">
            <SwiperBox data={data1} addTocart={addTocart} buyNow={buyNow} />
            <SwiperBox data={data2} addTocart={addTocart} buyNow={buyNow} />
        </div>
    );
};

export default TodaysBox;
