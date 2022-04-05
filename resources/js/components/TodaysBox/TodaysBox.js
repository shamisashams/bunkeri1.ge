import React from "react";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AddToCart, CommonButton, SliderButtons } from "../Buttons/Buttons";
import "./TodaysBox.css";
import { todayPrice } from "./TodaysData";

const TodaysBox = () => {
  const secondBox = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="todays_boxes flex">
      <div className="box">
        <div className="flex head">
          <div className="title35">დღის პროდუქცია</div>
          <SliderButtons />
        </div>
        <div className="progressbar">
          <div className="fill"></div>
        </div>
        <Slider {...secondBox}>
          {todayPrice.map((item, index) => {
            return (
              <div className="inbox_slider" key={index}>
                <div className="img">
                  <img src={item.img} alt="" />
                </div>
                <strong>{item.name}</strong>
                <p className="op05">{item.para}</p>
                <div className="flex centered">
                  <div className="blue">17.5 ლარი</div>
                  <div className="old_price">27.5 ლარი</div>
                </div>
                <div className="flex btns centered">
                  <AddToCart />
                  <CommonButton link="/" text="ყიდვა" />
                </div>
              </div>
            );
          })}
        </Slider>
        {/* <Slider arrows={false}>
          {todayProducts.map((item, index) => {
            return (
              <div className="inbox_slider " key={index}>
                <div className="flex">
                  <div className="inner_slide">
                    <Slider
                      asNavFor={nav2}
                      slidesToShow={1}
                      ref={(slider1) => setNav1(slider1)}
                      arrows={false}
                    >
                      {item.imgs.map((img, i) => {
                        return <img key={i} src={img} alt="" className="" />;
                      })}
                    </Slider>
                    <Slider
                      className="thumnails"
                      ref={(slider2) => setNav2(slider2)}
                      {...thumbnails}
                    >
                      {item.imgs.map((img, i) => {
                        return (
                          <div className="img" key={i}>
                            <img src={img} alt="" className="" />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                  <div className="details">
                    <div className="blue">{item.brand}</div>
                    <strong>{item.product}</strong>
                    <p className="op05">{item.para}</p>
                    <strong className="price">
                      ფასი: <span className="blue">{item.price} ლარი</span>
                    </strong>
                    <div className="flex btns">
                      <AddToCart />
                      <CommonButton link="/" text="ყიდვა" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider> */}
      </div>
      <div className="box two">
        <div className="flex head">
          <div className="title35">დღის ფასი</div>
          <SliderButtons />
        </div>
        <div className="progressbar">
          <div className="fill"></div>
        </div>
        <Slider {...secondBox}>
          {todayPrice.map((item, index) => {
            return (
              <div className="inbox_slider" key={index}>
                <div className="img">
                  <img src={item.img} alt="" />
                </div>
                <strong>{item.name}</strong>
                <p className="op05">{item.para}</p>
                <div className="flex centered">
                  <div className="blue">17.5 ლარი</div>
                  <div className="old_price">27.5 ლარი</div>
                </div>
                <div className="flex btns centered">
                  <AddToCart />
                  <CommonButton link="/" text="ყიდვა" />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TodaysBox;