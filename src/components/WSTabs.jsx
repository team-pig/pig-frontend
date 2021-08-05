import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const WSTabs = ({ url }) => {
  const history = useHistory();

  const toMain = () => {
    history.push(`${url}`);
  };

  const toDocs = () => {
    history.push(`${url}/doc/blank`);
  };

  const toBoard = () => {
    history.push(`${url}/board`);
  };

  const toCalendar = () => {
    history.push(`${url}/calendar`);
  };

  return (
    <List>
      <Item onClick={toMain}>메인</Item>
      <Item onClick={toDocs}>문서</Item>
      <Item onClick={toBoard}>보드</Item>
      <Item onClick={toCalendar}>일정</Item>
    </List>
  );
};

// 가짜 스타일
const List = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 80px 0 60px;
`;

const Item = styled.div`
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 2rem;
  cursor: pointer;
`;

export default WSTabs;
