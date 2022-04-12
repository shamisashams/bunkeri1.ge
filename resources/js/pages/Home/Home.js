import React from "react";
import {
  CommonButton,
  RoundButton,
  SliderButtons,
} from "../../components/Buttons/Buttons";
import { ProductBox } from "../../components/ProductBox/ProductBox";
import "./Home.css";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { SliderData } from "../../components/ProductSlider/SliderData";
import TodaysBox from "../../components/TodaysBox/TodaysBox";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const Home = ({page,seo}) => {
    const sharedData = usePage().props.localizations;
    const { images, products } = usePage().props;
    console.log(products)
  return (
      <Layout seo={seo}>
          <div className="homePage">
              <div className="hero_section" style={{ background: "url(" + images[0] + ")" }}>
                  <div className="wrapper">
                      <div className="title35 blue">{__('client.home_section1_title',sharedData)}</div>
                      <div className="archy-edt blue">
                          {renderHTML(__('client.home_section1_text',sharedData).newLineToBr())}
                      </div>
                      <RoundButton link="/" text={__('client.home_section1_btn_title',sharedData)} />
                  </div>
              </div>
              <div className="new_products wrapper">
                  <ProductSlider
                      showArrows
                      head="ახალი კოლექცია"
                      data={products.new_collection}
                      rightBtns={[
                          <div>
                              <CommonButton link="/#special_price" text="სპეც ფასი" />
                              <CommonButton gray link="/" text="ახალი" />
                              <CommonButton gray link="/" text="პოპულარული" />
                          </div>,
                          <SliderButtons />,
                      ]}
                  />
              </div>
              <div className="bunker">
                  <div className="wrapper">
                      <ProductSlider head="ბუნკერი" data={products.bunker} />
                  </div>
              </div>
              <div className="today wrapper">
                  <TodaysBox day_product={products.day_product} day_price={products.day_price} />
              </div>
              <div className="special_price" id="special_price">
                  <div className="wrapper">
                      <ProductSlider
                          head="სპეციალური ფასი"
                          data={products.special_price_tag}
                          rightBtns={[<CommonButton link="/" text="სრულად" />]}
                      />
                  </div>
              </div>
              <div id="popular_products" className="popular wrapper">
                  <ProductSlider
                      head="პოპულარული"
                      data={products.popular}
                      rightBtns={[<CommonButton link="/" text="სრულად" />]}
                  />
              </div>
              <div className="new_collection">
                  <div className="wrapper">
                      <div className="title35">ახალი კოლექცია</div>
                      <div className="archy-edt">
                          შესძინე საკუთარ თავს მეტი თავდაჯერებულობა და შეიგრძენი ამერიკული და
                          ევროპული ხარისხი
                      </div>
                      <RoundButton white text="გაიგე მეტი" link="/" />
                  </div>
              </div>
          </div>

      </Layout>
  );
};

export default Home;
