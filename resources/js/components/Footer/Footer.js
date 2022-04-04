import React from "react";
import { Link } from "@inertiajs/inertia-react";

import { SocialMedia } from "../SmallComps/SocialMedia";
import "./Footer.css";

const Footer = () => {
  const { pathname } = "/";
  const contactInfo = [
    {
      link: "/",
      icon: "/img/icons/header/pin.svg",
      text: "აკაკი წერეთლის N1",
    },
    {
      link: "/",
      icon: "/img/icons/header/tel.svg",
      text: "+995 555 555 555",
    },
    {
      link: "/",
      icon: "/img/icons/header/mail.svg",
      text: "didube_dollarstore@yahoo.com",
    },
  ];
  const links = [
    {
      link: "/",
      name: "ტანსაცმელი",
    },
    {
      link: "/",
      name: "ფეხსაცმელი",
    },
    {
      link: "/",
      name: "ჩანთა & აქსესუარი",
    },
    {
      link: "/",
      name: "თეთრეული",
    },
    {
      link: "/",
      name: "თავის მოვლა",
    },
    {
      link: "/",
      name: "საოჯახო პროდუქცია",
    },
    {
      link: "/",
      name: "მობ. აქსესუარები",
    },
    {
      link: "/",
      name: "სათვალე",
    },
    {
      link: "/",
      name: "სუნამო",
    },
  ];
  return (
    <div
      className="footer"
      style={{
        background:
          pathname === "/products"
            ? "#f5f5f5"
            : "linear-gradient(to top, #e5e5e5, transparent)",
      }}
    >
      <div className="wrapper">
        <Link href="/">
          <img src="/img/logo/1.svg" alt="" />
        </Link>
        <div className="flex main">
          <div className="column">
            <div className="archy-edt">ჩვენ შესახებ</div>
            <div className="op05">
              მსოფლიო ბრენდების მიერ შექმნილი ფუნქციური და დახვეწილი ჩანთები,
              რომლებსაც გამოიყენებთ მოგზაურობასა და თუ სახლიდან რიგითი
              გასვლისას.
            </div>
            <SocialMedia color="#2F3E51" />
          </div>
          <div className="column">
            <div className="archy-edt">დაგვიკავშირდით</div>
            {contactInfo.map((info, index) => {
              return (
                <Link className="contact_info" href={info.link} key={index}>
                  <img src={info.icon} alt="" />
                  <span>{info.text}</span>
                </Link>
              );
            })}
          </div>
          <div className="column">
            <div className="archy-edt">მოგვძებნე რუკაზე</div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11909.044506590086!2d44.7621418!3d41.7364602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1648473368143!5m2!1sen!2sge"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="bottom_Links flex">
          {links.map((link, i) => {
            return (
              <Link className="archy-edt" key={i} href={link.link}>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
