import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title }) => (
  <Helmet>
    <title>{`${title} | νμλΌμ§π·`}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={`${title} | νμλΌμ§π·`} />
  </Helmet>
);

export default SEO;
