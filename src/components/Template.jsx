import React from "react";
import styled from "styled-components";

const Template = ({ children }) => {
  return <Main>{children}</Main>;
};

const Main = styled.main`
  width: 100%;
  padding: 88px 0 5vh 0;
  min-height: calc(100vh - 100px);
`;

export default Template;
