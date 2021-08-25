import React from "react";
import styled, { keyframes } from "styled-components";
import { button } from "../themes/textStyle";

const EventBtn = ({ fixed }) => {
  return (
    <LinkBtn
      href="https://forms.gle/xBWHEJKjQ1pMn74Q8"
      target="_blank"
      rel="noreferrer"
      fixed={fixed}
    ></LinkBtn>
  );
};

const pigAnimation = keyframes`
    0% {
      transform: translateY(0);
    }
    100% {
      transform : translateY(-30px);
    }

`;

const LinkBtn = styled.a`
  position: ${(props) => (props.fixed ? "fixed" : "absolute")};
  bottom: 30px;
  right: 30px;
  width: 100px;
  height: 100px;
  background-image: url("https://teampigbucket.s3.ap-northeast-2.amazonaws.com/character.png1629831791983");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  text-decoration: none;
  animation: ${pigAnimation} 500ms infinite ease-in-out alternate;

  &::before {
    ${button};
    content: "이벤트참여!";
    position: absolute;
    top: -20px;
    left: 10px;
    display: none;
    width: 70px;
    white-space: nowrap;
    color: var(--main);
    transition: display 200ms ease-in-out;
  }

  &:hover {
    animation-duration: 300ms;

    &::before {
      display: block;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default EventBtn;
