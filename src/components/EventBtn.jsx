import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { button, body_3 } from "../themes/textStyle";

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
      transform : translateY(-5px);
    }

`;

const LinkBtn = styled.a`
  position: ${(props) => (props.fixed ? "fixed" : "absolute")};
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  background-image: url("https://teampigbucket.s3.ap-northeast-2.amazonaws.com/character.png1629831791983");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  text-decoration: none;
  animation: ${pigAnimation} 500ms infinite ease-in-out alternate;
  z-index: var(--indexEventBtn);

  &::before {
    ${button};
    content: "이벤트참여!";
    position: absolute;
    top: -20px;
    left: -5px;
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

  ${({ theme }) => theme.device.mobile} {
    top: 10px;
    left: 20px;
    width: 30px;
    height: 30px;
    animation: none;

    &::before {
      content: "";
    }
  }
`;

export default EventBtn;
