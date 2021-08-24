import React from "react";
import styled from "styled-components";

import { body_3 } from "../../themes/textStyle";

const RoomInput = (props) => {
  return (
    <>
      <Input
        autoComplete="off"
        onChange={props._onChange}
        type={props.type}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
      />
    </>
  );
};

const Input = styled.input`
  ${body_3};
  width: 100%;
  height: 46px;
  color: var(--black);
  border: 1px solid var(--line);
  padding: 12px 14px;
  margin-bottom: 12px;
  outline: none;
  transition: border-color 150ms ease-in-out;

  ::placeholder {
    color: var(--grey);
  }

  &:focus {
    border: 1px solid var(--main);
  }
`;

export default RoomInput;
