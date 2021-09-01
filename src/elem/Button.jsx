import React from "react";
import styled, { css } from "styled-components";

// rest 종류 : size(width_숫자만)
const Button = ({ shape, children, ...rest }) => {
  switch (shape) {
    case "green-fill":
      return (
        <GreenFill
          disabled={rest.disabled}
          color="main"
          onClick={rest._onClick}
          {...rest}
        >
          {children}
        </GreenFill>
      );
    case "green-outline":
      return (
        <GreenLine color="main" onClick={rest._onClick} {...rest}>
          {children}
        </GreenLine>
      );
    case "pink-fill":
      return (
        <PinkFill color="point" onClick={rest._onClick} {...rest}>
          {children}
        </PinkFill>
      );
    case "pink-outline":
      return (
        <PinkLine color="point" onClick={rest._onClick} {...rest}>
          {children}
        </PinkLine>
      );
    default:
      return (
        <GreenFill color="main" onClick={rest._onClick} {...rest}>
          {children}
        </GreenFill>
      );
  }
};

const BtnDefault = css`
  ${(props) => {
    const { size } = props;
    return css`
      width: ${size ? `${size}px` : "100%"};
      height: 50px; // 변경 가능성 있음
      border: 1px solid ${(props) => `var(--${props.color})`};
      font-size: 1.6rem;
      font-weight: bold;
      line-height: 2.2rem;
      transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
    `;
  }}
  height: 50px; // 변경 가능성 있음
  border: 1px solid ${(props) => `var(--${props.color})`};
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 2.2rem;
  transition: color 300ms ease-in-out, background-color 300ms ease-in-out;

  ${({ theme }) => theme.device.mobile} {
    width: ${(props) => (props.smSize ? `${props.smSize}px;` : "100%;")};
  }
`;

const FillBtn = css`
  ${BtnDefault};
  color: var(--white);
  background-color: ${(props) => `var(--${props.color})`};
  ${(props) =>
    props.disabled
      ? `background-color: var(--line); 
    color: var(--grey);
    border: 1px solid var(--grey);`
      : ""}

  &:hover {
    color: ${(props) => `var(--${props.color})`};
    background-color: var(--white);

    ${(props) =>
      props.disabled
        ? `background-color: var(--line); 
    color: var(--grey);
    border: 1px solid var(--grey)`
        : ""}
  }
`;

const LineBtn = css`
  ${BtnDefault};
  color: ${(props) => `var(--${props.color})`};
  background-color: var(--white);

  &:hover {
    color: var(--white);
    background-color: ${(props) => `var(--${props.color})`};
  }
`;

const GreenFill = styled.button`
  ${FillBtn};
`;

const GreenLine = styled.button`
  ${LineBtn};
`;

const PinkFill = styled.button`
  ${FillBtn};
`;

const PinkLine = styled.button`
  ${LineBtn};
`;

export default Button;
