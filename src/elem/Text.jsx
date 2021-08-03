import React from "react";
import styled, { css } from "styled-components";

const Text = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  color: var(--black);

  ${(props) =>
    props.type === "head_1" &&
    css`
      font-size: 6rem;
      line-height: 7rem;
    `}
  ${(props) =>
    props.type === "head_2" &&
    css`
      font-size: 4.4rem;
      line-height: 5.2rem;
      letter-spacing: -0.05rem;
    `}
    ${(props) =>
    props.type === "head_3" &&
    css`
      font-size: 4rem;
      line-height: 5rem;
    `}
    ${(props) =>
    props.type === "head_4" &&
    css`
      font-size: 3.4rem;
      line-height: 4rem;
      letter-spacing: 0.05rem;
    `}
    ${(props) =>
    props.type === "head_5" &&
    css`
      font-size: 3rem;
      line-height: 3.4rem;
    `}
    ${(props) =>
    props.type === "head_6" &&
    css`
      font-size: 2.2rem;
      line-height: 2.4rem;
    `}
    ${(props) =>
    props.type === "sub_1" &&
    css`
      font-size: 2rem;
      line-height: 2.6rem;
      letter-spacing: 0.02rem;
      font-weight: bold !important;
    `}
    ${(props) =>
    props.type === "sub_2" &&
    css`
      font-size: 1.6rem;
      line-height: 2.4rem;
      letter-spacing: 0.05rem;
    `}
    ${(props) =>
    props.type === "body_1" &&
    css`
      font-size: 1.8rem;
      line-height: 2.4rem;
      letter-spacing: -0.02rem;
      font-weight: bold !important;
    `}

    ${(props) =>
    props.type === "body_2" &&
    css`
      font-size: 1.4rem;
      line-height: 2.2rem;
      font-weight: 700;
      font-weight: bold !important;
    `}

    ${(props) =>
    props.type === "body_3" &&
    css`
      font-size: 1.4rem;
      line-height: 2.2rem;
      letter-spacing: -0.02rem;
    `}

    ${(props) =>
    props.type === "body_4" &&
    css`
      font-size: 1.2rem;
      line-height: 1.8rem;
    `};

  ${(props) =>
    props.type === "gnb" &&
    css`
      font-family: "Montserrat";
      font-size: 1.8rem;
      line-height: 2.4rem;
      letter-spacing: -0.04rem;
      font-weight: 700 !important;
    `};

  ${(props) =>
    props.type === "caption" &&
    css`
      font-family: "Lato";
      font-size: 1.2rem;
      line-height: 1.8rem;
      font-weight: 700 !important;
    `};
`;

export default Text;
