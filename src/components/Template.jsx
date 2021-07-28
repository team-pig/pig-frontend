import React from "react";
import styled from "styled-components";

const Template = ({ children }) => {
  return <Main>{children}</Main>;
};

const Main = styled.main`
  width: 100%;
  border: 1px solid red;
  padding: 80px 0 0 0;
  min-height: calc(100vh - 100px);
`;
export default Template;
