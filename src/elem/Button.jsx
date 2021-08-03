import React from "react";
import styled, { css } from "styled-components";

const Button = ({ children, ...rest }) => {
  return (
    <Wrapper onClick={rest._onClick} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  font-size: 1.6rem;
  font-family: "NanumSquareRound";
  font-weight: bold;
  line-height: 2.2rem;
  height: 50px;
  color: var(--white);
  transition: 100ms all ease-in-out;
  background-color: var(--main);
  border: 1px solid var(--main);

  width: ${(props) =>
    props.large
      ? "380px"
      : props.small
      ? "120px"
      : props.full
      ? "100%"
      : "140px"};

  ${(props) =>
    props.fill &&
    css`
      cursor: pointer;
      &:hover {
        background-color: var(--white);
        border: 1px solid var(--main);
        color: var(--main);
      }
    `}

  ${(props) =>
    props.outline &&
    css`
      background-color: var(--white);
      border: 1px solid var(--main);
      color: var(--main);
      cursor: pointer;
      &:hover {
        border: 1px solid var(--point);
        color: var(--point);
      }
    `};
`;

export default Button;
