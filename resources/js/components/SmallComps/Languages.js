import React from "react";
import { usePage } from "@inertiajs/inertia-react";

export const Languages = () => {
    const { locales, currentLocale, locale_urls } = usePage().props;
  return (
    <div className="language">
      <div className="on archy-edt">
          {Object.keys(locales).map((name, index) => {
              if (locales[name] === currentLocale) {
                  return name;
              }
          })}
      </div>
      <div className="drop">
          {Object.keys(locales).map((name, index) => {
              if (locales[name] !== currentLocale) {
                  return (
                      <a href={locale_urls[name]} key={name + "locale"}>
                          {name}
                      </a>
                  );
              }
          })}
      </div>
    </div>
  );
};
