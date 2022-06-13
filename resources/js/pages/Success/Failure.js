import React, { useState, useEffect } from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import "./Success.css";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";

const Failure = () => {
    const sharedData = usePage().props.localizations;
    const [sparkle, setSparkle] = useState(false);
    useEffect(() => {
        setSparkle(true);
    }, []);
    const path = [
        {
            title: __("client.page_home", sharedData),
        },
        {
            title: __("client.page_cart", sharedData),
        },
        {
            title: __("client.page_checkout", sharedData),
        },
    ];
    return (
        <Layout>
            <div className="successPage failure">
                <PagePath
                    first="მთავარი /"
                    previous={breadcrumb(path)}
                    current="შეკვეთის გაფორმება"
                />
                <div className="failure_box">
                    <img src="/img/icons/other/fail.png" alt="" />
                    <h2>გადახდა ვერ განხორციელდა</h2>
                    <div>გთხოვთ გადაამოწმოთ ინფორმაცია და სცადოთ ხელახლა</div>
                    <button className="back flex centered">
                        <img src="/img/icons/other/back.png" alt="" />
                        <span>უკან დაბრუნება</span>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Failure;
