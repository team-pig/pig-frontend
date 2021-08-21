import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import flex from "../themes/flex";
import { head_2 } from "../themes/textStyle";

const MyAvatar = ({ large }) => {
  const { color, avatar, nickname, email } = useSelector(
    (state) => state.user.user
  );

  return (
    <Container color={color} avatar={avatar} large={large}>
      {nickname && avatar === "" && <Nickname>{nickname[0]}</Nickname>}
    </Container>
  );
};

const Container = styled.div`
  ${flex()}
  ${(props) =>
    props.large
      ? css`
          ${head_2}
          width: 100px;
          height: 100px;
        `
      : css`
          width: 24px;
          height: 24px;
        `}
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
        `}

  color: var(--white);
  margin: 0 auto;
`;

const Nickname = styled.div`
  /* text-transform: uppercase; */
`;

export default MyAvatar;
