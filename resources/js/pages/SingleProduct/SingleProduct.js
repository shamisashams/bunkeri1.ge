import React, { useState } from "react";
//import Arr1 from "../../assets/images/icons/arrows/2.svg";
import { MainButton } from "../../components/MainButton/MainButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SingleProduct.css";
import {
  ProductBox,
  ProductImage,
} from "../../components/ProductObjects/ProductObjects";
//import Img1 from "../../assets/images/products/1.png";
//import Img2 from "../../assets/images/products/2.png";
//import Img3 from "../../assets/images/products/3.png";
//import Img4 from "../../assets/images/products/4.png";

import Layout from "../../Layouts/Layout";
import {usePage} from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";

const SingleProduct = ({page,seo}) => {
    const sharedData = usePage().props.localizations;
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
    const { product, category_path, similar_products } = usePage().props;
    //console.log(product);
    //console.log(category);
    //console.log(similar_products);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: nav1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const productSlides = [
    {
      img: "/assets/images/products/1.png",
      off: "20",
    },
    {
      img: "/assets/images/products/2.png",
    },
    {
      img: "/assets/images/products/3.png",
      off: "15",
    },
    {
      img: "/assets/images/products/4.png",
    },
    {
      img: "/assets/images/products/3.png",
      off: "15",
    },
    {
      img: "/assets/images/products/4.png",
    },
  ];
  const similarProducts = [
    {
      img: "/assets/images/products/1.png",
      cat: "Chair Padded Seat",
      off: "20",
    },
    {
      img: "/assets/images/products/2.png",
      cat: "Chair Padded Seat",
    },
    {
      img: "/assets/images/products/3.png",
      cat: "Chair Padded Seat",
      off: "70",
    },
    {
      img: "/assets/images/products/4.png",
      cat: "Chair Padded Seat",
    },
    {
      img: "/assets/images/products/1.png",
      cat: "Chair Padded Seat",
      off: "20",
    },
    {
      img: "/assets/images/products/2.png",
      cat: "Chair Padded Seat",
    },
    {
      img: "/assets/images/products/3.png",
      cat: "Chair Padded Seat",
      off: "70",
    },
    {
      img: "/assets/images/products/4.png",
      cat: "Chair Padded Seat",
    },
  ];

    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

    const breadcrumb = function (path){
        let rows = [];
        path.map(function (el,i){
                rows.push(<span>{el.title}</span>)
                rows.push(<img src="/assets/images/icons/arrows/2.svg" alt="" />)
        })
        return rows
    }

    const breadcrumb2 = function (path){
        let rows = [];

        path.map(function (el,i){
            if(i < path.length - 1){
                rows.push(<span className="op5">{el.title}</span>)
                rows.push(<span className="op5">,</span>)
            } else {
                rows.push(<span className="op5">{el.title}</span>)
            }


        })
        return rows
    }

  return (
      <Layout seo={seo}>
    <div className="SingleProduct">
      <div className="container">
        <div className="path">
          <span>{__('client.nav_home',sharedData)}</span> <img src="/assets/images/icons/arrows/2.svg" alt="" />
            {breadcrumb(category_path)}
          <span className="active">{product.title}</span>
        </div>
        <div className="flex main">
          <div className="view">
            <Slider
              className="slider_1"
              asNavFor={nav2}
              slidesToShow={1}
              ref={(slider1) => setNav1(slider1)}
              arrows={false}
            >
              {product.files.map((item, i) => {
                return <ProductImage src={'/' + item.path + '/' + item.title} discount={item.off} />;
              })}
            </Slider>
            <Slider
              className="slider_2"
              ref={(slider2) => setNav2(slider2)}
              {...settings}
            >
              {product.files.map((item, i) => {
                return (
                  <ProductImage key={i} src={'/' + item.path + '/' + item.title} discount={item.off} />
                );
              })}
            </Slider>
          </div>
          <div className="details">
            <div className="bold">{product.title}</div>
            <div className={(product.stock == 1) ? 'in_stock': 'no_stock'}>{(product.stock == 1) ? __('client.product_in_stock',sharedData): __('client.product_no_stock',sharedData)}</div>
            <p className="op5">
                {renderHTML(product.description)}
            </p>
            <div className="margin">
              <div style={{ marginBottom: "10px" }}>
                  {__('client.product_categories',sharedData)}: <span className="op5">{breadcrumb2(category_path)}</span>
              </div>
              <div>
                  {__('client.product_code',sharedData)}: <span>{product.code}</span>
              </div>
            </div>

            <MainButton link={route('client.contact.index')} text={__('client.product_order_btn',sharedData)} />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="similar_products bold">{__('client.product_similar_products',sharedData)}</div>
        <div className="grid4">
          {similar_products.data.map((item, i) => {

              let link = route('client.product.show',item.slug);
            return (
              <ProductBox
                key={i}
                src={( item.files.length > 0) ? '/' + item.files[0].path + '/' + item.files[0].title : null}
                discount={item.sale}
                category={item.title}
                link={link}
              />
            );
          })}
        </div>
      </div>
    </div>
      </Layout>
  );
};

export default SingleProduct;
