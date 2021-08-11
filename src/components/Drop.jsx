import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../elem/index";

const Item = ({
  children,
  width,
  height,
  _onClick,
  color,
  direction,
  ...rest
}) => {
  return (
    <Btn
      width={width}
      height={height}
      color={color}
      onClick={_onClick}
      {...rest}
    >
      <Text>{children}</Text>
    </Btn>
  );
};

const Container = ({
  children,
  width,
  height,
  display,
  direction,
  closeDownDrop,
  type,
  shadow,
  ...rest
}) => {
  const [isShow, setIsShow] = useState()
  return (
    <ModalOverlay display={display} onClick={closeDownDrop}>
    <Wrapper
        display={display}
        width={width}
        height={height}
        shadow={shadow}
        {...rest}
      >
        {children}
    </Wrapper>
    </ModalOverlay>
   
  );
};

const Overlay = (display, children, ...rest) => {
  <ModalOverlay>{children}</ModalOverlay>
}

const Btn = styled.button`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  z-index: var(--indexHeader);
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => `var(--${props.color})`};
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: var(--indexHeader);
  top: 245px;
  left: 270px;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: -0.01px -0.01px 2px rgb(0 0 0 / 10%),
    6px 6px 15px rgba(0 0 0 / 0.1);
`;

const ModalOverlay = styled.div`
  position: absolute;
  z-index: 29;
  display: ${(props) => (props.display ? "flex" : "none")};
  width: 100%;
  height: 100%;
`;

const Drop = {
  Overlay,
  Container,
  Item, 
};

export default Drop;
