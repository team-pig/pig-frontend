import React from "react";
import styled, { css } from "styled-components";

const Button = ({ shape, children, ...rest }) => {
  switch (shape) {
    case "green-fill":
      return (
        <GreenFill color="main" onClick={rest._onClick} {...rest}>
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
  width: 100%;
  height: 50px; // 변경 가능성 있음
  border: 1px solid ${(props) => `var(--${props.color})`};
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 2.2rem;
  transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
`;

const FillBtn = css`
  ${BtnDefault};
  color: var(--white);
  background-color: ${(props) => `var(--${props.color})`};

  &:hover {
    color: ${(props) => `var(--${props.color})`};
    background-color: var(--white);
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
