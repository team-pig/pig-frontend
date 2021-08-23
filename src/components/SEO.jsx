import React from "react";
import { Helmet } from "react-helmet";
import ogImage from "../assets/img/ogimage.jpg";

const SEO = ({ title }) => (
  <Helmet>
    <meta name="description" content="쉽고, 빠르고, 가벼운 협업툴" />
    <title>{`${title} | 협업돼지🐷`}</title>
    <meta property="og:title" content={title} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content="협업돼지" />
    <meta property="og:description" content="쉽고, 빠르고, 가벼운 협업툴" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="새로운 협업툴, 협업돼지" />
    <meta name="twitter:title" content={`${title} | 협업돼지🐷`} />
    <meta name="twitter:description" content="쉽고, 빠르고, 가벼운 협업툴" />
    <meta name="twitter:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
  </Helmet>
);

export default SEO;
