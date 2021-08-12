import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Text } from "../../elem";
import flex from "../../themes/flex";

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
  history,
  componentType,
  bgColor,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const modalEl = useRef();

  // ---- 다른 영역 클릭 시, 드랍다운 off ---- //

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

  // ---- 다른 영역 클릭 시, 드랍다운 off ---- //

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

  // ---- Dropdown default ---- //
  return (
    <DropdownBtn
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        setIsMenuVisible((pre) => !pre);
      }}
    >
      {isMenuVisible && (
        <ItemWrapper history={history} direction={direction} ref={modalEl}>
          {children}
        </ItemWrapper>
      )}
    </DropdownBtn>
  );
};

// ---- color picker ---- //
const ColorPicker = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.colors[props.bgColor]};
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const ColorItem = styled.div`
  ${flex("center", "center")}
  position: absolute;
  left: 50%;
  bottom: -70px;
  transform: translateX(-50%);
  border: 1px solid var(--line);
  gap: 10px;
  width: 180px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--white);
`;

// ---- default drop down ---- //
const DropdownBtn = styled.div`
  ${flex("center", "center")}
  position: relative;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background-color: var(--white);
`;

const ItemWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 20px;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 10%);
  background-color: #fff;
  z-index: var(--indexDrop);
  border-radius: 4px;
  div:nth-child(1) {
    border-radius: 4px 4px 0 0;
  }
  div:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

const Link = styled.div`
  ${flex("center", "center")}
  width: 132px;
  height: 44px;
  cursor: pointer;
  background-color: var(--white);
  &:hover {
    background-color: var(--line);
  }
`;

const BoardDrop = {
  Container,
  Item,
};

export default BoardDrop;
