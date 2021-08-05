import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// elem
import { Text } from "../elem";

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
      <Item onClick={toMain}>
        <Text type="body_1">메인</Text>
      </Item>
      <Item onClick={toDocs}>
        <Text type="body_1">문서</Text>
      </Item>
      <Item onClick={toBoard}>
        <Text type="body_1">보드</Text>
      </Item>
      <Item onClick={toCalendar}>
        <Text type="body_1">일정</Text>
      </Item>
    </List>
  );
};

// 가짜 스타일
const List = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Item = styled.button`
  height: 100%;
  padding: 0 39px;
  color: var(--darkgrey);
  cursor: pointer;
`;

export default WSTabs;
