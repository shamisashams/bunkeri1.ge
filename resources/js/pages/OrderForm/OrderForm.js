import React from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import Product1 from "/img/products/3.png";
import Product2 from "/img/products/2.png";
import Product3 from "/img/products/6.png";
import "./OrderForm.css";
import { YellowButton } from "../../components/Buttons/Buttons";
import { Link } from "@inertiajs/inertia-react";

const OrderForm = () => {
  const items = [
    {
      img: Product1,
      name: "პროდუქტის დასახელება გრძელი ვარიანტი",
      brand: "brandname",
      price: 17.5,
      quantity: 1,
    },
    {
      img: Product2,
      name: "პროდუქტის დასახელება გრძელი ვარიანტი",
      brand: "brandname",
      price: 48,
      quantity: 2,
    },
    {
      img: Product3,
      name: "პროდუქტის დასახელება გრძელი ვარიანტი",
      brand: "brandname",
      price: 27.99,
      quantity: 1,
    },
  ];
  const inputs = [
    {
      type: "text",
      Placeholder: "სახელი",
    },
    {
      Placeholder: "ქალაქი / სოფელი",
      type: "text",
    },
    {
      Placeholder: "გვარი",
      type: "text",
    },
    {
      Placeholder: "მისამართი",
      type: "text",
    },
    {
      Placeholder: "ტელეფონის ნომერი",
      type: "number",
    },
    {
      Placeholder: "ელფოსტა",
      type: "number",
    },
  ];
  return (
    <div className="orderformPage">
      <PagePath
        first="მთავარი /"
        previous="კალათა"
        current="შეკვეთის გაფორმება"
      />
      <div className="wrapper">
        <div className="title35">შეკვეთის გაფორმება</div>
        <div className="grid">
          <div className="first">
            <div className="title archy-edt">შეიყვანე პირადი ინფორმაცია</div>
            <div className="input_grid">
              {inputs.map((input, index) => {
                return (
                  <input
                    className="common_input"
                    placeholder={input.Placeholder}
                    key={index}
                    type={input.type}
                  />
                );
              })}
              <textarea
                className="common_input"
                placeholder="დამატებითი ინფორმაცია"
              ></textarea>
            </div>
          </div>
          <div className="products">
            <div className="title archy-edt">შენი შეკვეთა</div>
            {items.map((item, index) => {
              return (
                <div
                  key={index}
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
                  <div className="quantity">{item.quantity}</div>
                  <div>{item.price} ლარი</div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="title archy-edt">საკურიერო მომსახურება</div>
            <div className="checks">
              <input type="radio" name="location" id="tbilisi" />
              <label htmlFor="tbilisi">თბილისი</label>
            </div>
            <div className="checks">
              <input type="radio" name="location" id="region" />
              <label htmlFor="region">რეგიონი</label>
            </div>
            <div className="checks last">
              <input type="checkbox" name="location" id="iagree" />
              <label htmlFor="iagree">
                გავეცანი და ვეთანხმები{" "}
                <Link className="blue" href="/" style={{ whiteSpace: "nowrap" }}>
                  წესებს და პირობებს
                </Link>
              </label>
            </div>
          </div>
          <div>
            <div className="title archy-edt">
              <strong className="total_cost">
                ჯამური თანხა: <span>188</span> ლარი
              </strong>
            </div>
            <div className="checks">
              <input type="radio" name="payment" id="cash" />
              <label htmlFor="cash">ნაღდი ანგარიშსწორება</label>
            </div>
            <div className="checks">
              <input type="radio" name="payment" id="bank-transfer" />
              <label htmlFor="bank-transfer">გადახდა ბანკით</label>
            </div>
            <YellowButton link="/payment" text="შეკვეთის გაფორმება" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
