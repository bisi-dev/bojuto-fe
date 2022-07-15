import React from "react";
import Helmet from "react-helmet";

const TitleComponent = ({ title }) => {
  var defaultTitle = "⚛️ app";
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  );
};

export default TitleComponent;
