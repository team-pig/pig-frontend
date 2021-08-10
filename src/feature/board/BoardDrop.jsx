import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Text } from "../../elem";

const Item = ({ children, _onClick, componentType, color }) => {
  if (componentType === "colorPicker")
    return (
      <Color color={color} onClick={_onClick}>
        {children}
      </Color>
    );

  return (
    <Link onClick={_onClick}>
      <Text type="body_3">{children}</Text>
    </Link>
  );
};

const Color = styled.div`
  background-color: ${(props) => props.theme.colors[props.color]};
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 200ms ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const Container = ({
  children,
  size,
  direction,
  type,
  shadow,
  history,
  componentType,
  bgColor,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const modalEl = useRef();

  const handleClickOutside = (e) => {
    e.stopPropagation();
    if (modalEl.current && !modalEl.current.contains(e.target)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalEl]);

  if (componentType === "colorPicker") {
    return (
      <ColorPicker
        bgColor={bgColor}
        onClick={() => {
          setIsMenuVisible(!isMenuVisible);
        }}
      >
        {isMenuVisible && (
          <ColorItem componentType={componentType} ref={modalEl}>
            {children}
          </ColorItem>
        )}
      </ColorPicker>
    );
  }

  return (
    <Wrapper
      shadow={shadow}
      size={size}
      onClick={() => {
        setIsMenuVisible(!isMenuVisible);
      }}
    >
      {type === "default" ? <></> : type === "add" ? <div>hello</div> : ""}

      {isMenuVisible && (
        <ItemWrapper history={history} direction={direction} ref={modalEl}>
          {children}
        </ItemWrapper>
      )}
    </Wrapper>
  );
};

const ColorPicker = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.colors[props.bgColor]};
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const ColorItem = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -70px;
  border: 1px solid var(--line);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 180px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--white);

  /* width: 200px; */
`;

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: transform ease-in-out 200ms;
  ${(props) => props.shadow && `box-shadow: 0px 0px 12px rgb(0 0 0 / 10%);`}
  &:hover {
    background-color: var(--primary-lightgray);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const ItemWrapper = styled.div`
  z-index: 999;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 10%);
  background-color: #fff;
  position: absolute;
  ${(props) =>
    props.direction === "right" &&
    css`
      left: 150%;
      top: 0;
    `}
`;

const Link = styled.div`
  z-index: 999;
  width: 132px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--line);
  }
`;

const BoardDrop = {
  Container,
  Item,
};

export default BoardDrop;
