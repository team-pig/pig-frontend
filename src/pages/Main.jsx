import React, { useEffect } from "react";
import styled from "styled-components";
import flex from "../themes/flex";

import StatusSection from "../feature/main/StatusSection";
import Information from "../feature/main/Information";

import { useDispatch } from "react-redux";
import { __loadMyTodos, __loadProjectTodo } from "../redux/modules/todos";

import { useParams } from "react-router-dom";
import MyTodos from "../feature/main/MyTodos";
import { hiddenScroll } from "../themes/hiddenScroll";

const Main = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadMyTodos(roomId)); // 메인 (투두리스트)
    dispatch(__loadProjectTodo(roomId)); // 메인 (대시보드)
  }, [dispatch, roomId]);

  return (
    <Container>
      <StatusSection />
      <Information />
      <MyTodos />
    </Container>
  );
};

const Container = styled.article`
  --header: 48px;
  --minusHeight: calc(var(--header));

  width: 100%;
  height: calc(100vh - var(--minusHeight));
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: 40% 1fr;
  grid-template-areas:
    "Status Information"
    "Status MyTodos";

  ${({ theme }) => theme.device.mobile} {
    ${hiddenScroll}
    height: auto;
    grid-template-columns: 1fr;
    grid-template-rows: auto 180px minmax(200px, auto);
    grid-template-areas:
      "Information"
      "Status"
      "MyTodos";
  }
`;

export default Main;
