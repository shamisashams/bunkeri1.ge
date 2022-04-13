import React, { useState } from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import { Arrow, Cart } from "../../components/SmallComps/Icons";
import { YellowButton } from "../../components/Buttons/Buttons";
import "./ProductDetails.css";
import Slider from "react-slick/lib/slider";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { SliderData } from "../../components/ProductSlider/SliderData";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia'


const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });

const ProductDetails = ({page,seo}) => {
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

    const sharedData = usePage().props.localizations;

    const { product, category_path, similar_products, product_images, product_attributes } = usePage().props;

    console.log(similar_products)
    console.log(product)
    console.log(product_attributes)




    const addToCart = function (product){
        //localStorage.removeItem('cart')
        let _cart = localStorage.getItem('cart');
        let cart;
        if (_cart !== null) {
            cart = JSON.parse(_cart);
        } else cart = [];

        let qty = parseInt(document.getElementById('qty_add').value);


        if(cart.length > 0){
            let exists = false;
            cart.forEach(function (el,i){

                if(el.product.id === product.id){
                    el.qty += qty;
                    exists = true;
                }

            })
            if (!exists) {
                let obj = {
                    product: product,
                    qty: qty
                }
                cart.push(obj);
            }

        } else {
            let obj = {
                product: product,
                qty: qty
            }
            cart.push(obj);
        }


        localStorage.setItem('cart',JSON.stringify(cart))
        console.log(JSON.parse(localStorage.getItem('cart')))
        //localStorage.removeItem('cart')
        Inertia.visit(window.location.href)
    }

    const buyNow = function (product){
        let _cart = localStorage.getItem('cart');
        let cart;
        if (_cart !== null) {
            cart = JSON.parse(_cart);
        } else cart = [];

        let qty = parseInt(document.getElementById('qty_add').value);


        if(cart.length > 0){
            let exists = false;
            cart.forEach(function (el,i){

                if(el.product.id === product.id){
                    el.qty += qty;
                    exists = true;
                }

            })
            if (!exists) {
                let obj = {
                    product: product,
                    qty: qty
                }
                cart.push(obj);
            }

        } else {
            let obj = {
                product: product,
                qty: qty
            }
            cart.push(obj);
        }


        localStorage.setItem('cart',JSON.stringify(cart))
        console.log(JSON.parse(localStorage.getItem('cart')))
        //localStorage.removeItem('cart')
        Inertia.get(route('client.checkout.index'));
    }

  return (
      <Layout seo={seo}>
        <div className="productDetails">
          <PagePath previous={breadcrumb(category_path)} />
          <div className="flex main">
            <div className="image_slider flex">
              <div>
                <div>
                  <Slider
                    {...verticalSlider}
                    ref={(slider2) => setNav2(slider2)}
                    className="vertical"
                  >
                    {product_images.map((img, index) => {
                      return (
                        <div className="img" key={index}>
                          <img src={"/" + img.path + "/" + img.title} alt="" />
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
                  {product_images.map((img, index) => {
                    return (
                      <div className="img" key={index}>
                        <img src={"/" + img.path + "/" + img.title} alt="" />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="details">
              <div className="status" style={product.quantity > 0 ? { color: "#3BB77E" } : { color: "#B73B3BFF" }}>
                  {product.quantity > 0 ? __('client.instock',sharedData) : __('client.nostock',sharedData)}
                <img src="/img/icons/other/check.svg"alt="" style={{ verticalAlign: "middle" }} />
              </div>
              <div className="archy-edt title">
                  {product.title}
              </div>
              <div className="op05">
                მწარმოებელი: <span>{product_attributes.brand}</span>
              </div>
              <div className="blue price">{product.price} ლარი</div>
              <div className="btns">
                <div className="flex">
                  <div className="number radius5">
                    <button
                      onClick={() => setquantity(quantity > 1 ? quantity - 1 : 1)}
                    >
                      −
                    </button>
                    <input id="qty_add" type="number" value={quantity} readOnly />
                    <button onClick={() => setquantity(quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => addToCart(product)} className="add flex radius5">
                    <Cart color="#fff" />
                    <span className="archy-edt">{__('client.prod_det_add_to_cart',sharedData)}</span>
                  </button>
                </div>
                <YellowButton link="/" text={__('client.buy_now',sharedData)} />
                  <button onClick={()=>buyNow(product)}>Buy Now</button>
              </div>
              <div className="flex share blue">
                <div className="icon flex centered radius5">
                  <img src="/img/icons/other/share.svg"alt="" />
                </div>
                <span>{__('client.share_product',sharedData)}</span>
              </div>
              <div className="archy-edt title">{__('client.product_description',sharedData)}</div>
              <div className="op05">
                  {renderHTML(product.description)}
              </div>
            </div>
          </div>
          {/*<div className="wrapper">
            <ProductSlider head={__('client.product.similar',sharedData)} data={similar_products} />
          </div>*/}
        </div>
      </Layout>
  );
};

export default ProductDetails;
