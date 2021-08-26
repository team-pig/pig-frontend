import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title }) => (
  <Helmet>
    <title>{`${title} | 협업돼지🐷`}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={`${title} | 협업돼지🐷`} />
  </Helmet>
);

export default SEO;
