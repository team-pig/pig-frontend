import React from "react";
import styled from "styled-components";

const IconBtn = ({ _onClick, children, ...rest }) => {
  return (
    <Btn onClick={_onClick} {...rest}>
      {children}
    </Btn>
  );
};

const Btn = styled.button`
  padding: ${(props) => (props.padding ? `${props.padding};` : `10px`)};
  flex-shrink: 0;
`;

export default IconBtn;
