import React from "react";
import styled from "styled-components";
import { Text } from "../elem";

const CountText = (limit, value) => {
  const isGrey = typeof value !== typeof limit || value <= limit;

  return (
    <Count
      type="body_4"
      color={isGrey ? `grey` : `notice`}
    >{`${value}/${limit}`}</Count>
  );
};

const Count = styled(Text)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding-right: 5px;
`;

export default CountText;
