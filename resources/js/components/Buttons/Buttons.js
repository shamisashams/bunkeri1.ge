import React from "react";
import "./Buttons.css";
import { Arrow } from "../SmallComps/Icons";
import {Link, usePage} from "@inertiajs/inertia-react";
import { Cart } from "../SmallComps/Icons";



export const CatButton = ({ onClick, rotate }) => {
    const sharedData = usePage().props.localizations;
  return (
    <button className="category_btn flex radius5" onClick={onClick}>
      <img src="/img/icons/header/cat.svg"alt="" />
      <span>{__('client.categories_btn_title',sharedData)}</span>
      <Arrow color="#fff" rotate={rotate} />
    </button>
  );
};

export const RoundButton = ({ link, text, white }) => {
  return (
    <Link href={link}>
      <button
        className={white ? "round_btn white archy-edt" : "round_btn archy-edt"}
      >
        {text}
      </button>
    </Link>
  );
};

export const CommonButton = ({ link, text, gray }) => {
  return (
    <Link className={gray ? "common_btn gray" : "common_btn"} href={link}>
      {text}
    </Link>
  );
};

export const AddToCart = () => {
    const sharedData = usePage().props.localizations;
  return (
    <button className="add_to_cart">
      <Cart color="#303285" />
        {__('client.add_to_cart_btn',sharedData)}
    </button>
  );
};

export const PrevSlide = () => {
  return (
    <button className="arrow left radius5 flex centered">
      <Arrow color="#11151C" rotate="90" />
    </button>
  );
};

export const NextSlide = () => {
  return (
    <button className="arrow right radius5 flex centered">
      <Arrow color="#11151C" rotate="-90" />
    </button>
  );
};

export const SliderButtons = () => {
  return (
    <div className="slider_btns flex">
      <PrevSlide />
      <NextSlide />
    </div>
  );
};

export const YellowButton = ({ link, text }) => {
  return (
    <Link href={link}>
      <button className="yellow_button archy-edt">{text}</button>
    </Link>
  );
};
