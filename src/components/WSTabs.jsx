import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const WSTabs = ({ url }) => {
  const history = useHistory();

  const toMain = () => {
    history.push(`${url}/`);
  };

  const toDocs = () => {
    history.push(`${url}/docs`);
  };

  const toBoard = () => {
    history.push(`${url}/board`);
  };

  const toCalendar = () => {
    history.push(`${url}/calendar`);
  };

  return (
    <List>
      <li onClick={toMain}>메인</li>
      <li onClick={toDocs}>문서</li>
      <li onClick={toBoard}>보드</li>
      <li onClick={toCalendar}>일정</li>
    </List>
  );
};

// 가짜 스타일
const List = styled.ul`
  position: relative;
  z-index: 99;
`;

export default WSTabs;
