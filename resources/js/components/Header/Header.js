import React, { useState } from "react";
import {Link, usePage} from "@inertiajs/inertia-react";
import { Pin } from "../SmallComps/Icons";
import { SocialMedia } from "../SmallComps/SocialMedia";
import "./Header.css";
import { Languages } from "../SmallComps/Languages";
import { CatButton } from "../Buttons/Buttons";
import Categories from "../Categories/Categories";

const Header = () => {
  const [categoryDrop, setCategoryDrop] = useState(false);
  const toggleDrop = () => {
    setCategoryDrop(!categoryDrop);
  };

    const sharedData = usePage().props.localizations;
    const {info} = usePage().props;


  const links = [
    {
      name: __('client.header_last_added',sharedData),
      link: "/products",
    },
    {
      name: __('client.header_popular',sharedData),
      link: "/products",
    },
    {
      name: __('client.header_special',sharedData),
      link: "/products",
    },
  ];
  const inCartProducts = [
    {
      link: "/",
      img: "/img/products/1.png",
      name: "პროდუქტის დასახელება",
      number: "1",
      price: "17.0",
    },
    {
      link: "/",
      img: "/img/products/2.png",
      name: "პროდუქტის დასახელება",
      number: "1",
      price: "17.0",
    },
    {
      link: "/",
      img: "/img/products/3.png",
      name: "პროდუქტის დასახელება",
      number: "1",
      price: "17.0",
    },
    {
      link: "/",
      img: "/img/products/3.png",
      name: "პროდუქტის დასახელება",
      number: "1",
      price: "17.0",
    },
    {
      link: "/",
      img: "/img/products/1.png",
      name: "პროდუქტის დასახელება",
      number: "1",
      price: "17.0",
    },
  ];
  return (
    <div className="header">
      <div className="top">
        <div className="wrapper flex">
          <Link className="logo " href={route('client.home.index')}>
            <img src="/img/logo/1.svg" alt="" />
          </Link>
          <Link className="logo second" href="/">
            <img src="/img/logo/2.svg" alt="" />
          </Link>
          <div className="search radius5">
            <input type="text" placeholder={__('client.header_search_placeholder',sharedData)} />
            <button>
              <img src="/img/icons/header/search.svg" alt="" />
            </button>
          </div>
          <div className="contact_info blue">
            <Link className="archy-edt" href="/">
              <Pin color="#303285" />
              {info.address}
            </Link>
            <Link className="archy-edt" href="/">
                {info.phone}
            </Link>
          </div>
          <SocialMedia color="#303285" />
        </div>
      </div>
      <div className="bottom">
        <div className="wrapper flex">
          <div className="flex">
            <CatButton
              onClick={() => toggleDrop()}
              rotate={categoryDrop ? "180" : "0"}
            />
            {links.map((link, i) => {
              return (
                <Link className="links_3" key={i} href={link.link}>
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex">
            <div className="shopping_cart">
              <Link className="  flex centered" href="/shopping-cart">
                <div className="number_of_products">
                  {inCartProducts.length}
                </div>
                <img src="/img/icons/header/cart.svg" alt="" />
                <span className="archy-edt">{__('client.header_cart',sharedData)}</span>
              </Link>
              <div className="cart_drop">
                <div className="incart_products">
                  {inCartProducts.map((item, index) => {
                    return (
                      <Link className="flex" href={item.link} key={index}>
                        <div className="img">
                          <img src={item.img} alt="" />
                        </div>
                        <div>
                          <strong>{item.name}</strong>
                          <p>
                            {item.number} x {item.price}₾
                          </p>
                        </div>
                        <button className="close">
                          <img src="/img/icons/other/close.svg" alt="" />
                        </button>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex total">
                  <strong>ჯამი</strong>
                  <strong>3200 ₾</strong>
                </div>
                <div className="flex">
                  <button className="archy-edt blue">კალათა</button>
                  <button className="archy-edt">გადახდა</button>
                </div>
              </div>
            </div>

            <Languages />
          </div>
        </div>
      </div>
      <Categories linkList={links} dropList={categoryDrop} />
    </div>
  );
};

export default Header;
