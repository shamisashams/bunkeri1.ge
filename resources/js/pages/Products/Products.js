import React, { useState } from "react";
import Filters from "../../components/Filters/Filters";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./Products.css";
import { productsData } from "./ProductsData";
import { ProductBox } from "../../components/ProductBox/ProductBox";
import { Arrow } from "../../components/SmallComps/Icons";
import Layout from "../../Layouts/Layout";
import { usePage } from "@inertiajs/inertia-react";

const Products = ({page,seo}) => {
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const animatedComponents = makeAnimated();
  const options = [
    { value: "ფასის ზრდადობით", label: "ფასის ზრდადობით" },
    { value: "ფასის კლებით", label: "ფასის კლებით" },
    { value: "თარიღის მიხედვით", label: "თარიღის მიხედვით" },
  ];

    const { products, category, images } = usePage().props;

    console.log(products);

  return (
      <Layout seo={seo}>
        <div className="productsPage">
          <div className="wrapper flex main">
            <div
              className={
                showFilter ? "column filter_column show" : "column filter_column"
              }
            >
              <div className="headtitle">ფილტრი</div>

              <Filters />
            </div>
            <div className="column pro_co">
              <button className="filter_btn" onClick={() => toggleFilter()}>
                <img src="/img/icons/other/filter.png" alt="" />
              </button>
              <div className="flex headflex">
                <div className="headtitle">კატეგორიის დასახელება</div>
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  placeholder="თარიღის მიხედვით"
                  isMulti={false}
                  options={options}
                />
              </div>
              <div className="product_grid">
                {products.data.map((data, index) => {
                  return (
                    <ProductBox
                      key={index}
                      link={route('client.product.show',data.slug)}
                      img={( data.latest_image != null) ? '/' + data.latest_image.path + '/' + data.latest_image.title : null}
                      title={data.title}
                      price={data.price}
                      sale={data.sale}
                      new={data.new}
                    />
                  );
                })}
              </div>
              <div className="pagination flex centered">
                <button>
                  <Arrow color="#2F3E51" rotate="90" />
                  <Arrow color="#2F3E51" rotate="90" />
                </button>
                <div className="nums">
                  <button className="num">1</button>
                  <button className="num">2</button>
                  <button className="num">3</button>
                  <button className="num">4</button>
                </div>

                <button>
                  <Arrow color="#2F3E51" rotate="-90" />
                  <Arrow color="#2F3E51" rotate="-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default Products;
