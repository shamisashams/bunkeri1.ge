import React, {useState} from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import Product1 from "/img/products/3.png";
import Product2 from "/img/products/2.png";
import Product3 from "/img/products/6.png";
import "./OrderForm.css";
import { YellowButton } from "../../components/Buttons/Buttons";
import { Link } from "@inertiajs/inertia-react";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia'

const getCart = function (){
    let cart = [];
    let _cart = localStorage.getItem('cart');
    if(_cart !== null) cart = JSON.parse(_cart);

    let total = 0;
    cart.forEach(function (el,i){
        total += el.qty * el.product.price;
    })

    let obj = {
        items: cart,
        total: total
    }
    return obj;
}

const OrderForm = ({seo}) => {
    /*const { errors } = usePage().props
    console.log(errors);*/
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
        name: "first_name"
    },
    {
      Placeholder: "ქალაქი / სოფელი",
      type: "text",
        name: "city"
    },
    {
      Placeholder: "გვარი",
      type: "text",
        name: "last_name"
    },
    {
      Placeholder: "მისამართი",
      type: "text",
        name: "address"
    },
    {
      Placeholder: "ტელეფონის ნომერი",
      type: "number",
        name: "phone"
    },
    {
      Placeholder: "ელფოსტა",
      type: "email",
        name: "email"
    },
  ];

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    })

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('client.checkout.order'), values)
    }

    function handleClick(e) {
        //document.getElementById('order_f').submit();
        values['cart'] = getCart();
        Inertia.post(route('client.checkout.order'), values, {onSuccess: (page) => {
            console.log(page)
            }})
    }


  return (
      <Layout seo={seo}>
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
                  <form id="order_f" onSubmit={handleSubmit}>
                      <div className="input_grid">
                          {inputs.map((input, index) => {
                              return (
                                  <input
                                      className="common_input"
                                      placeholder={input.Placeholder}
                                      key={index}
                                      type={input.type}
                                      name={input.name}
                                      onChange={handleChange}
                                  />
                              );
                          })}
                          <textarea name="info"
                                    className="common_input"
                                    placeholder="დამატებითი ინფორმაცია"
                                    onChange={handleChange}
                          ></textarea>
                      </div>
                  </form>

              </div>
              <div className="products">
                <div className="title archy-edt">შენი შეკვეთა</div>
                {getCart().items.map((item, index) => {
                  return (
                    <div
                      key={index}
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
                      <div className="quantity">{item.qty}</div>
                      <div>{item.product.price.toFixed(2)} ლარი</div>
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
                    ჯამური თანხა: <span>{getCart().total.toFixed(2)}</span> ლარი
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
                <YellowButton onclick={handleClick} text="შეკვეთის გაფორმება" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default OrderForm;
