import React from "react";
import styled from "styled-components";

const Textarea = ({ value, name, _onChange, placeholder, rows }) => {
  return (
    <Wrapper
      value={value}
      name={name}
      onChange={_onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

const Wrapper = styled.textarea``;
export default Textarea;
