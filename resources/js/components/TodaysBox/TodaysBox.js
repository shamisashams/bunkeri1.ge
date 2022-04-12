import React from "react";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AddToCart, CommonButton, SliderButtons } from "../Buttons/Buttons";
import "./TodaysBox.css";
import { todayPrice } from "./TodaysData";
import {usePage} from "@inertiajs/inertia-react";

const TodaysBox = ({day_product,day_price,addTocart}) => {
    const sharedData = usePage().props.localizations;
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
          <div className="title35">{__('client.today_product',sharedData)}</div>
          <SliderButtons />
        </div>
        <div className="progressbar">
          <div className="fill"></div>
        </div>
        <Slider {...secondBox}>
          {day_product.map((item, index) => {
            return (
              <div className="inbox_slider" key={index}>
                <div className="img">
                  <img src={( item.latest_image != null) ? '/' + item.latest_image.path + '/' + item.latest_image.title : null} alt="" />
                </div>
                <strong>{item.title}</strong>
                <p className="op05">{item.short_description}</p>
                <div className="flex centered">
                  <div className="blue">{item.special_price !== null ? item.special_price.toFixed(2) : item.price.toFixed(2)} ლარი</div>
                    {item.special_price !== null ? <div className="old_price">{item.price.toFixed(2)} ლარი</div>: null}
                </div>
                <div className="flex btns centered">
                  <AddToCart onClick={() => addTocart(item)} />
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
          <div className="title35">{__('client.today_price',sharedData)}</div>
          <SliderButtons />
        </div>
        <div className="progressbar">
          <div className="fill"></div>
        </div>
        <Slider {...secondBox}>
          {day_price.map((item, index) => {
            return (
              <div className="inbox_slider" key={index}>
                <div className="img">
                  <img src={( item.latest_image != null) ? '/' + item.latest_image.path + '/' + item.latest_image.title : null} alt="" />
                </div>
                <strong>{item.title}</strong>
                <p className="op05">{item.short_description}</p>
                <div className="flex centered">
                  <div className="blue">{item.special_price !== null ? item.special_price.toFixed(2) : item.price.toFixed(2)} ლარი</div>
                    {item.special_price !== null ? <div className="old_price">{item.price.toFixed(2)} ლარი</div>: null}
                </div>
                <div className="flex btns centered">
                  <AddToCart onClick={() => addTocart(item)} />
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
