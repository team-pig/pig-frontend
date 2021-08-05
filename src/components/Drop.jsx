import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../elem/index";

const Item = ({ children, width, height, _onClick, color, direction }) => {
  return (
    <Btn width={width} height={height} color={color} onClick={_onClick}>
      <Text>{children}</Text>
    </Btn>
  );
};

const Container = ({ children, width, height, direction, type, shadow }) => {
  const [isMenuVisible, setIsMenuVisible] = useState("");
  return (
    <Wrapper width={width} height={height} shadow={shadow}>
      {children}
    </Wrapper>
  );
};

const Btn = styled.button`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  color: ${(props) => `var(--${props.color})`};
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  border-radius: 5px;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 10%);
`;

const Drop = {
  Container,
  Item,
};

export default Drop;
