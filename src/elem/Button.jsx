import React from "react";
import styled from "styled-components";

const Button = ({ children, _onClick, type }) => {
  return (
    <Wrapper onClick={_onClick} type={type}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button``;
export default Button;
