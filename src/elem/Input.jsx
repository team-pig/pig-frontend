import React from "react";
import styled from "styled-components";

const Input = ({ value, name, _onChange, placeholder, type }) => {
  return (
    <Wrapper
      value={value}
      name={name}
      type={type}
      onChange={_onChange}
      placeholder={placeholder}
    />
  );
};

const Wrapper = styled.input``;
export default Input;
