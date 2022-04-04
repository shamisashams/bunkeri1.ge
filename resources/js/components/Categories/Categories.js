import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Arrow } from "../SmallComps/Icons";
import { CatData } from "./CatData";
import "./Categories.css";

const Categories = ({ dropList, linkList }) => {
  const [showCategory, setShowcategory] = useState(0);
  return (
    <div
      className={
        dropList
          ? "category_container wrapper flex dropped"
          : "category_container wrapper flex"
      }
    >
      <div className="category_list">
        <div className="responsive_links">
          {linkList.map((link, index) => {
            return (
              <Link
                className="category  flex archy-edt"
                key={index}
                href={link.link}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        {CatData.map((cat, index) => {
          return (
            <div
              onMouseEnter={() => setShowcategory(index + 1)}
              onMouseLeave={() => setShowcategory(0)}
              className={
                showCategory === index + 1
                  ? "category  flex hovered"
                  : "category  flex"
              }
              key={index}
            >
              <span className="archy-edt">{cat.category}</span>
              <Arrow color="#11151C" rotate="-90" />
            </div>
          );
        })}
      </div>
      {CatData.map((cat, index) => {
        return (
          <div
            onMouseEnter={() => setShowcategory(index + 1)}
            onMouseLeave={() => setShowcategory(0)}
            key={index}
            className={
              showCategory === index + 1
                ? "category_columns show"
                : "category_columns"
            }
          >
            <div className="grid">
              {cat.columns.map((column, index) => {
                return (
                  <div className="column" key={index}>
                    <div className="archy-edt">{column.title}</div>
                    {column.links.map((link, i) => {
                      return (
                        <Link href={link.to} key={i}>
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <img src={cat.img} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
