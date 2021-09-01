import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Text } from "../elem/index";
import Icon from "./Icon";
import { button } from "../themes/textStyle";

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
      // color={color}
      onClick={_onClick}
      {...rest}
    >
      {children}
    </Btn>
  );
};

const Container = ({
  children,
  width,
  height,
  // display,
  direction,
  closeDownDrop,
  type,
  shadow,
  ...rest
}) => {
  const [isShow, setIsShow] = useState();
  const dropModal = useRef();

  const handleClickOutside = (e) => {
    e.stopPropagation();
    if (dropModal.current && !dropModal.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropModal]);

  return (
    <>
      <IconBtn
        onClick={(e) => {
          e.stopPropagation();
          setIsShow((pre) => !pre);
        }}
      >
        <Icon icon="more" size="24px" />
        {
          isShow && (
            // <ModalOverlay
            // // display={display}
            // onClick={closeDownDrop} ref={dropModal}>
            <Wrapper
              ref={dropModal}
              // display={display}
              width={width}
              height={height}
              shadow={shadow}
              {...rest}
            >
              {children}
            </Wrapper>
          )

          // </ModalOverlay>
        }
      </IconBtn>
    </>
  );

  // return (
  //   <ModalOverlay display={display} onClick={closeDownDrop}>
  //   <Wrapper
  //       display={display}
  //       width={width}
  //       height={height}
  //       shadow={shadow}
  //       {...rest}
  //     >
  //       {children}
  //   </Wrapper>
  //   </ModalOverlay>

  // );
};

const Btn = styled.div`
  ${button}
  display: flex;
  flex-direction: flex-start;
  /* justify-content: center; */
  align-items: center;
  z-index: var(--indexHeader);
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding-left: 20px;
  /* color: ${(props) => `var(--${props.color})`}; */
  color: var(--darkgrey);

  &:hover {
    color: var(--main);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 29;
  left: 15px;
  top: 21px;
  /* position: relative; */

  /* top: 245px;
  left: 270px; */
  /* display: ${(props) => (props.display ? "flex" : "none")}; */
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: -0.01px -0.01px 2px rgb(0 0 0 / 10%),
    6px 6px 15px rgba(0 0 0 / 0.1);
`;

const IconBtn = styled.div`
  position: relative;
  width: 24px;
  height: 24px;

  cursor: pointer;
`;

const Drop = {
  Container,
  Item,
};

export default Drop;
