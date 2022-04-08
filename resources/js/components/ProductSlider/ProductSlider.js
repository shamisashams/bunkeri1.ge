import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import { ProductBox } from "../ProductBox/ProductBox";
import "./ProductSlider.css";
import { NextSlide, PrevSlide, SliderButtons } from "../Buttons/Buttons";

const ProductSlider = ({ data, head, rightBtns, showArrows }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: showArrows,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

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
      <div className="progressbar">
        <div className="fill"></div>
      </div>
      <Slider {...settings}>
        {data.map((item, index) => {
          return (
            <ProductBox
              key={index}
              link={route('client.product.show',item.slug)}
              img={( item.latest_image != null) ? '/' + item.latest_image.path + '/' + item.latest_image.title : null}
              title={item.title}
              price={item.price}
              sale={item.sale}
              new={item.new}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
