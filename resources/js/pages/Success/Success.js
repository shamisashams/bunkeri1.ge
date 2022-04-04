import React, { useState, useEffect } from "react";
import { PagePath } from "../../components/PagePath/PagePath";
import "./Success.css";

const Success = () => {
  const [sparkle, setSparkle] = useState(false);
  useEffect(() => {
    setSparkle(true);
  }, []);
  return (
    <div className="successPage">
      <PagePath
        first="მთავარი /"
        previous="კალათა"
        current="შეკვეთის გაფორმება"
      />
      <img
        className={sparkle ? "sparkles pop" : "sparkles"}
        src="/img/icons/other/glitters.svg"
        alt=""
      />
      <div className="ball flex centered">
        <img src="/img/icons/other/success.svg" alt="" />
        <div className="archy-edt head">გადახდა შესრულებულია!</div>
        <div className="archy-edt">მადლობა შენაძენისთვის</div>
        <p>ჩამოტვირთე ქვითარი</p>
        <button>
          <img src="/img/icons/other/download.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Success;
