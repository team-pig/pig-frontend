import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import flex from "../themes/flex";
import { head_2 } from "../themes/textStyle";

const MyAvatar = ({ large, medium, ...rest }) => {
  const { color, avatar, nickname } = useSelector((state) => state.user.user);

  return (
    <Container
      color={color}
      avatar={avatar}
      large={large}
      medium={medium}
      {...rest}
    >
      {nickname && avatar === "" && <Nickname>{nickname[0]}</Nickname>}
    </Container>
  );
};

const Container = styled.div`
  ${flex()}
  ${(props) =>
    props.large &&
    css`
      ${head_2}
      width: 100px !important;
      height: 100px !important;
    `};

  ${(props) =>
    props.medium &&
    css`
      ${head_2}
      width: 38px !important;
      height: 38px !important;
      font-size: 1.6rem;
    `};

  width: 24px;
  height: 24px;
  border-radius: 50%;

  ${(props) =>
    props.avatar !== ""
      ? css`
          background-image: url(${props.avatar});
          background-size: cover;
          background-position: center center;
        `
      : css`
          background-color: ${(props) => props.theme.colors[props.color]};
        `};
  flex-shrink: 0;
  color: ${(props) => {
    if (props.color === "mint" || props.color === "yellow") {
      return "var(--darkgrey);";
    }
    return "var(--white);";
  }};
  flex-shrink: 0;
  color: var(--white);
`;

const Nickname = styled.div``;

export default MyAvatar;
