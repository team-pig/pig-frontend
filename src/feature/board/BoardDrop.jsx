import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

// component & elem
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import MemberImg from "../../elem/MemberImg";

const Item = ({ children, _onClick, componentType, color, target }) => {
  if (componentType === "colorPicker")
    return (
      <Color color={color} onClick={_onClick}>
        {children}
      </Color>
    );

  return (
    <Link onClick={_onClick} target={target}>
      {children}
    </Link>
  );
};

const Color = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors[props.color]};
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
  memberStatus,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const modalEl = useRef();
  console.log(memberStatus);

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
    <>
      <DropdownBtn
        size={size}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuVisible((pre) => !pre);
        }}
      >
        {memberStatus.length === 0 && (
          <Icon icon="member-plus" size="24px" color="var(--grey)" />
        )}
        {memberStatus.length !== 0 && <MemberImg memberStatus={memberStatus} />}

        {isMenuVisible && (
          <ItemWrapper history={history} direction={direction} ref={modalEl}>
            {children}
          </ItemWrapper>
        )}
      </DropdownBtn>
    </>
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
  z-index: var(--indexColorPicker);
`;

const ColorItem = styled.div`
  ${flex("center", "center")}
  position: absolute;
  left: 300%;
  bottom: -70px;
  transform: translateX(-50%);
  border: 1px solid var(--line);
  gap: 10px;
  width: 180px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--white);
  z-index: 99;
`;

// ---- default drop down ---- //
const DropdownBtn = styled.div`
  ${flex("center", "center")}
  position: relative;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: var(--white);
`;

const ItemWrapper = styled.div`
  ${flex("center", "center", false)}
  position: absolute;
  left: 20px;
  bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 6px 6px 20px 0px rgba(21, 21, 21, 0.15);
  -webkit-box-shadow: 6px 6px 20px 0px rgba(21, 21, 21, 0.15);
  -moz-box-shadow: 6px 6px 20px 0px rgba(21, 21, 21, 0.15);
  z-index: var(--indexDrop);
  overflow: hidden;
  /* div:nth-child(1) {
    border-radius: 4px 4px 0 0;
  }
  div:last-child {
    border-radius: 0 0 4px 4px;
  } */
`;

const Link = styled.div`
  ${flex("center", "center")};
  width: 132px;
  height: 44px;
  cursor: pointer;
  background-color: ${(props) =>
    props.target ? "var(--main)" : "var(--white)"};
  transition: transform ease-in-out 200ms;

  &:hover {
    ${(props) => {
      if (props.target) {
        return css`
          opacity: 0.9;
        `;
      }

      if (!props.target) {
        return css`
          background-color: var(--line);
        `;
      }
    }}
  }
`;

const BoardDrop = {
  Container,
  Item,
};

export default BoardDrop;
