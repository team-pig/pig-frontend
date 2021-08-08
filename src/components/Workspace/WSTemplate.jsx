import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";

const WSTemplate = ({ children }) => {
  return <Template>{children}</Template>;
};

const Template = styled.main`
  --header: 48px;

  ${flex("between", "start")};
  padding: 0;
  padding-top: var(--header);
  box-sizing: border-box; ;
`;

export default WSTemplate;
