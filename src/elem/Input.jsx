import React from "react";
import styled, { css } from "styled-components";

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
          id={props.id}
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
    return (
      <Checkbox
        type={props.type}
        onChange={props._onChange}
        checked={props.checked}
        id={props.id}
        {...props}
      />
    );
  }

  if (props.type === "date") {
    return <Date type={props.type} {...props} onChange={props._onChange} />;
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
      : "1px solid var(--line)"};
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

const Checkbox = styled.input`
  ${(props) =>
    props.none &&
    css`
      display: none;
    `}
`;

const Date = styled.input``;

export default Input;
