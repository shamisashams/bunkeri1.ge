import React from "react";
import "./ShoppingCart.css";
import { PagePath } from "../../components/PagePath/PagePath";
import { YellowButton } from "../../components/Buttons/Buttons";
import { Arrow } from "../../components/SmallComps/Icons";

const ShoppingCart = () => {
  // const [quantity, setquantity] = useState(1);
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
    <div className="shoppingcartPage">
      <PagePath previous="მთავარი" current="კალათა" />
      <div className="wrapper">
        <div className="title35">ჩემი კალათა</div>
        <div className="blue">სულ მოიძებნა 3 პროდუქტი</div>
        <div className="table">
          <table>
            <tr className="head">
              <th>პროდუქტი</th>
              <th>ერთეულის ფასი</th>
              <th>რაოდენობა</th>
              <th>ჯამი</th>
              <th>წაშლა</th>
            </tr>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div
                      className="flex intable_pro"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <div className="img">
                        <img src={item.img} alt="" />
                      </div>
                      <div>
                        <div className="name">{item.name}</div>
                        <div className="op05">მწარმოებელი: {item.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.price} ლარი</td>
                  <td>
                    <div className="number radius5">
                      <button>−</button>
                      <input type="number" value={item.quantity} />
                      <button>+</button>
                    </div>
                  </td>
                  <td className="sum">{item.price * item.quantity} ლარი</td>
                  <td>
                    <button className="remove flex centered">
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
              ჯამური თანხა: <span>188</span> ლარი
            </strong>
            <YellowButton link="/order-form" text="შეკვეთის გაფორმება" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
