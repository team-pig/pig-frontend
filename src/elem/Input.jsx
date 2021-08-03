import React, { useState } from "react";
import styled from "styled-components";

const Input = ({
  _onChange,
  _onClick,
  type,
  value,
  name,
  placeholder,
  isError,
  useHelper,
  ...styles
}) => {
  console.log(useHelper && useHelper.errors[name]);
  return (
    <>
      <Wrapper>
        <InputBx
          onChange={_onChange}
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          isError={isError}
          {...styles}
        />
        {value === "" ? "" : <IconX onClick={_onClick}>아이콘자리</IconX>}

        {/* helper msg */}
        {useHelper && useHelper.touched[name] && useHelper.errors[name] ? (
          <Helper>{useHelper.errors[name]}</Helper>
        ) : (
          ""
        )}
      </Wrapper>
    </>
  );
};

const Helper = styled.div`
  position: absolute;
  right: 0;
  transform: translateY(100%);
  bottom: -0.5rem;
  color: var(--notice);
`;

const Wrapper = styled.form`
  position: relative;
  margin: 2rem 0;
  width: 38rem;
  height: 4.6rem;
`;

const IconX = styled.div`
  position: absolute;
  right: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
`;

const InputBx = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 38rem;
  padding: 1.2rem 1.4rem;
  color: var(--black);
  font-size: 1.4rem;
  line-height: 2.2rem;
  letter-spacing: -0.02rem;
  height: 4.6rem;
  font-family: "NanumSquareRound";
  outline: none;
  border: ${(props) =>
    props.isError
      ? "0.1rem solid var(--notice) !important"
      : "0.1rem solid var(--darkgrey)"};

  ::placeholder {
    color: var(--grey);
  }
  &:focus {
    border: 0.1rem solid var(--main);
  }
`;

export default Input;
