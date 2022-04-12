import React, { useState, useEffect } from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import "./Success.css";
import Layout from "../../Layouts/Layout";
import {usePage} from "@inertiajs/inertia-react";

const Success = () => {
    const sharedData = usePage().props.localizations;
  const [sparkle, setSparkle] = useState(false);
  useEffect(() => {
    setSparkle(true);
  }, []);
    const path = [
        {
            title: __('client.page_home',sharedData),

        },
        {
            title: __('client.page_cart',sharedData),

        },
        {
            title: __('client.page_checkout',sharedData),

        },

    ];
  return (
      <Layout>
        <div className="successPage">
          <PagePath
            first="მთავარი /"
            previous={breadcrumb(path)}
            current="შეკვეთის გაფორმება"
          />
          <img
            className={sparkle ? "sparkles pop" : "sparkles"}
            src="/img/icons/other/glitters.svg"
            alt=""
          />
          <div className="ball flex centered">
            <img src="/img/icons/other/success.svg" alt="" />
            <div className="archy-edt head">{__('client.order_success_line1',sharedData)}</div>
            <div className="archy-edt">{__('client.order_success_line2',sharedData)}</div>
            <p>{__('client.order_success_download',sharedData)}</p>
            <button>
              <img src="/img/icons/other/download.svg" alt="" />
            </button>
          </div>
        </div>
      </Layout>
  );
};

export default Success;
