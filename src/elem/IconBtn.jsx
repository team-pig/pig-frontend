import React from "react";
import styled from "styled-components";

const IconBtn = ({ _onClick, children }) => {
  return <Btn onClick={_onClick}>{children}</Btn>;
};

const Btn = styled.button`
  padding: 10px;
  flex-shrink: 0;
`;

export default IconBtn;
