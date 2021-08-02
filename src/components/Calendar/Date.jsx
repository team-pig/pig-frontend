import React from "react";
import styled from "styled-components";

const Date = ({ list, children }) => {
  return (
    <DateBox>
      <DateNum>{children}</DateNum>
      {list.map((item) => (
        <button key={item.scheduleId}>{item.scheduleTitle}</button>
      ))}
    </DateBox>
  );
};

const DateBox = styled.div``;

const DateNum = styled.div``;

export default Date;
