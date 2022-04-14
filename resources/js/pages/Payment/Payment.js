import React from "react";
import { YellowButton } from "../../components/Buttons/Buttons";
import { PagePath } from "../../components/PagePath/PagePath";
import Receipt from "/img/icons/other/receipt.svg";
import "./Payment.css";

const Payment = () => {
    const costs = [
        {
            item: "პროდუქტის დასახელება",
            cost: "17.6",
        },
        {
            item: "პროდუქტის დასახელება",
            cost: "1.8",
        },
        {
            item: "პროდუქტის დასახელება",
            cost: "121.5",
        },
        {
            item: "პროდუქტის დასახელება",
            cost: "87",
        },
        {
            item: "პროდუქტის დასახელება",
            cost: "121.5",
        },
        {
            item: "პროდუქტის დასახელება",
            cost: "87",
        },
    ];
    return (
        <div className="paymentPage">
            <PagePath
                first="მთავარი /"
                previous="კალათა"
                current="შეკვეთის გაფორმება"
            />
            <div className="wrapper">
                <div className="title35">გადახდა ბანკით</div>
                <div className="archy-edt">შეიყვანეთ ბარათის მონაცემები</div>
                <div className="content ">
                    <div className="title op05">ბარათის მფლობელი</div>
                    <div className="flex main">
                        <div className="form">
                            <input type="text" className="common_input" />
                            <div className="title op05">
                                შეიყვანეთ ბარათის 16 ციფრიანი კოდი
                            </div>
                            <input
                                type="text"
                                maxLength="16"
                                className="common_input"
                            />
                            <div className="flex expiration">
                                <div className="op05">მოქმედების ვადა</div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        maxLength="2"
                                        className="common_input"
                                    />
                                    <span style={{ margin: "0 10px" }}>/</span>
                                    <input
                                        type="text"
                                        maxLength="2"
                                        className="common_input"
                                    />
                                </div>
                            </div>
                            <div className="flex cvv">
                                <div className="op05">მოქმედების ვადა</div>
                                <input
                                    type="text"
                                    maxLength="3"
                                    className="common_input"
                                />
                            </div>
                            <YellowButton text="გადახდა" />
                        </div>
                        <div className="receipt">
                            <div className="op05">მფლობელი</div>
                            <p>სახელი გვარი</p>
                            <div className="op05">შენაძენი</div>
                            <div className="costs">
                                {costs.map((el, i) => {
                                    return (
                                        <p className="flex" key={i}>
                                            <span>{el.item}</span>{" "}
                                            <span>{el.cost}₾</span>
                                        </p>
                                    );
                                })}
                            </div>
                            <div className="op05">მისამართი</div>
                            <p>ქუჩის დასახელება, ქალაქი</p>
                            <div className="total flex">
                                <div className="archy-edt">
                                    გადასახდელი თანხა: <br />
                                    <span className="archy-edt">188 ლარი</span>
                                </div>
                                <img src={Receipt} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
