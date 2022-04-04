import React, { useState } from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import { Arrow, Cart } from "../../components/SmallComps/Icons";
import { YellowButton } from "../../components/Buttons/Buttons";
import "./ProductDetails.css";
import Slider from "react-slick/lib/slider";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { SliderData } from "../../components/ProductSlider/SliderData";

const ProductDetails = () => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const verticalSlider = {
    slidesToShow: 3,
    SlidesToScroll: 1,
    vertical: true,
    dots: false,
    arrows: false,
    asNavFor: nav1,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          vertical: false,
        },
      },
    ],
  };
  const sliderImgs = ["/img/products/8.png", "/img/products/9.png", "/img/products/10.png", "/img/products/9.png"];
  const [quantity, setquantity] = useState(1);
  return (
    <div className="productDetails">
      <PagePath previous="საოჯახო პროდუქცია" current="ტექნიკა" />
      <div className="flex main">
        <div className="image_slider flex">
          <div>
            <div>
              <Slider
                {...verticalSlider}
                ref={(slider2) => setNav2(slider2)}
                className="vertical"
              >
                {sliderImgs.map((img, index) => {
                  return (
                    <div className="img" key={index}>
                      <img src={img} alt="" />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="main_slider">
            <button className="arrow left flex centered radius5">
              <Arrow color="#11151C" rotate="90" />
            </button>
            <button className="arrow right flex centered radius5">
              <Arrow color="#11151C" rotate="-90" />
            </button>
            <Slider
              className="large"
              slidesToShow={1}
              arrows={true}
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
            >
              {sliderImgs.map((img, index) => {
                return (
                  <div className="img" key={index}>
                    <img src={img} alt="" />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="details">
          <div className="status" style={{ color: "#3BB77E" }}>
            მარაგშია
            <img src="/img/icons/other/check.svg"alt="" style={{ verticalAlign: "middle" }} />
          </div>
          <div className="archy-edt title">
            უმაღლესი ხარისხის ცისფერი ტოსტერი
          </div>
          <div className="op05">
            მწარმოებელი: <span>brandname</span>
          </div>
          <div className="blue price">17.5 ლარი</div>
          <div className="btns">
            <div className="flex">
              <div className="number radius5">
                <button
                  onClick={() => setquantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  −
                </button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setquantity(quantity + 1)}>+</button>
              </div>
              <button className="add flex radius5">
                <Cart color="#fff" />
                <span className="archy-edt">კალათაში დამატება</span>
              </button>
            </div>
            <YellowButton link="/" text="გადაიხადე" />
          </div>
          <div className="flex share blue">
            <div className="icon flex centered radius5">
              <img src="/img/icons/other/share.svg"alt="" />
            </div>
            <span>გაუზიარე სხვას</span>
          </div>
          <div className="archy-edt title">პროდუქტის აღწერა</div>
          <div className="op05">
            მსოფლიო ბრენდების მიერ შექმნილი ფუნქციური და დახვეწილი ჩანთები,
            რომლებსაც გამოიყენებთ მოგზაურობასა და თუ სახლიდან რიგითი გასვლისას
            მსოფლიო ბრენდების მიერ შექმნილი ფუნქციური და დახვეწილი ჩანთები,
            რომლებსაც გამოიყენებთ მოგზაურობასა და თუ სახლიდან რიგითი გასვლისას
          </div>
        </div>
      </div>
      <div className="wrapper">
        <ProductSlider head="მსგავსი პროდუქცია" data={SliderData} />
      </div>
    </div>
  );
};

export default ProductDetails;
