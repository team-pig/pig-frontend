import React from "react";
import styled from "styled-components";

import Icon from "../components/Icon";
import { Text } from "../elem";
import { body_3 } from "../themes/textStyle";

const Input = (props) => {
  if (props.type === "text" || props.type === "password") {
    return (
      <Wrapper isError={props.isError}>
        <InputText
          onChange={props._onChange}
          type={props.type}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          isError={props.isError}
        />
        {props.value !== "" ? (
          <IconX onClick={props._onClick}>
            <Icon icon="delete" size="14px" />
          </IconX>
        ) : (
          ""
        )}

        {/* helper msg */}
        {props.useHelper &&
        props.useHelper.touched[props.name] &&
        props.useHelper.errors[props.name] ? (
          <Helper>
            <Text type="body_4">{props.useHelper.errors[props.name]}</Text>
          </Helper>
        ) : (
          ""
        )}
      </Wrapper>
    );
  }

  if (props.type === "checkbox") {
    return <Checkbox type={props.type} />;
  }
};

const Wrapper = styled.div`
  --noticeSize: 12px;
  --noticeTop: 4px;

  position: relative;
  margin-bottom: ${(props) =>
    props.isError
      ? `calc(12px + var(--noticeSize) + var(--noticeTop))`
      : `12px`};
`;

const IconX = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const InputText = styled.input`
  ${body_3};
  width: 100%;
  height: 46px;
  padding: 12px 14px;
  color: var(--black);
  border: ${(props) =>
    props.isError
      ? "1px solid var(--notice) !important"
      : "1px solid var(--darkgrey)"};
  outline: none;
  transition: border-color 150ms ease-in-out;

  ::placeholder {
    color: var(--grey);
  }

  &:focus {
    border: 1px solid var(--main);
  }
`;

const Helper = styled.div`
  position: absolute;
  bottom: -4px;
  right: 0;
  color: var(--notice);
  transform: translateY(100%);
`;

const Checkbox = styled.input``;

export default Input;
