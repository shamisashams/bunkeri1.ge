import React from "react";
import "./ShoppingCart.css";
import { PagePath } from "../../components/PagePath/PagePath";
import { YellowButton } from "../../components/Buttons/Buttons";
import { Arrow } from "../../components/SmallComps/Icons";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

const ShoppingCart = ({seo}) => {
  // const [quantity, setquantity] = useState(1);

    const getCart = function (){
        let cart = [];
        let _cart = localStorage.getItem('cart');
        if(_cart !== null) cart = JSON.parse(_cart);

        let total = 0;
        cart.forEach(function (el,i){
            total += el.qty * el.product.special_price !== null ? el.product.special_price : el.product.price;
        })

        let obj = {
            items: cart,
            total: total
        }
        return obj;
    }

    const removeCartItem = function (i){
        let cart = [];
        let _cart = localStorage.getItem('cart');
        if(_cart !== null) cart = JSON.parse(_cart);
        cart.splice(i,1);
        localStorage.setItem('cart',JSON.stringify(cart));
        Inertia.visit(window.location.href)
    }

  const items = [
    {
      img: "/img/products/3.png",
      name: "პროდუქტის დასახელება გრძელი ვარიანტი",
      brand: "brandname",
      price: 17.5,
      quantity: 1,
    },
    {
      img: "/img/products/2.png",
      name: "პროდუქტის დასახელება გრძელი ვარიანტი",
      brand: "brandname",
      price: 48,
      quantity: 2,
    },
    {
      img: "/img/products/6.png",
      name: "პროდუქტის დასახელება გრძელი ვარიანტი",
      brand: "brandname",
      price: 27.99,
      quantity: 1,
    },
  ];
  return (
      <Layout seo={seo}>
        <div className="shoppingcartPage">
          <PagePath previous="მთავარი" current="კალათა" />
          <div className="wrapper">
            <div className="title35">ჩემი კალათა</div>
            <div className="blue">სულ მოიძებნა {getCart().items.length} პროდუქტი</div>
            <div className="table">
              <table>
                <tr className="head">
                  <th>პროდუქტი</th>
                  <th>ერთეულის ფასი</th>
                  <th>რაოდენობა</th>
                  <th>ჯამი</th>
                  <th>წაშლა</th>
                </tr>
                {getCart().items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          className="flex intable_pro"
                          style={{ justifyContent: "flex-start" }}
                        >
                          <div className="img">
                            <img src={( item.product.latest_image != null) ? '/' + item.product.latest_image.path + '/' + item.product.latest_image.title : null} alt="" />
                          </div>
                          <div>
                            <div className="name">{item.product.title}</div>
                            <div className="op05">მწარმოებელი: {item.product.attributes.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.product.special_price !== null ? item.product.special_price.toFixed(2) : item.product.price.toFixed(2)} ლარი</td>
                      <td>
                        <div className="number radius5">
                          <button>−</button>
                          <input type="number" value={item.qty} />
                          <button>+</button>
                        </div>
                      </td>
                      <td className="sum">{((item.product.special_price !== null ? item.product.special_price : item.product.price) * item.qty).toFixed(2)} ლარი</td>
                      <td>
                        <button onClick={(event) => removeCartItem(index)} className="remove flex centered">
                          <img src="/img/icons/other/delete.svg" alt="" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="bottom flex">
              <button className="back">
                <Arrow color="#fff" rotate="90" />
                <span className="archy-edt">შოპინგის გაგრძელება</span>
              </button>
              <div>
                <strong className="total_cost">
                  ჯამური თანხა: <span>{getCart().total.toFixed(2)}</span> ლარი
                </strong>
                <YellowButton link={route('client.checkout.index')} text="შეკვეთის გაფორმება" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default ShoppingCart;
