import React, { useEffect } from "react";
import styled from "styled-components";
import flex from "../themes/flex";

import StatusSection from "../feature/main/StatusSection";
import Information from "../feature/main/Information";

import { useDispatch } from "react-redux";
import { __loadMyTodos, __loadProjectTodo } from "../redux/modules/todos";

import { useParams } from "react-router-dom";
import MyTodos from "../feature/main/MyTodos";

const Main = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadMyTodos(roomId)); // 메인 (투두리스트)
    dispatch(__loadProjectTodo(roomId)); // 메인 (대시보드)
  }, [dispatch, roomId]);

  return (
    <Container>
      <LeftSide>
        <StatusSection />
      </LeftSide>
      <RightSide>
        <Information />
        <MyTodos />
      </RightSide>
    </Container>
  );
};

const Container = styled.article`
  --header: 48px;
  --minusHeight: calc(var(--header));

  ${flex("start", "start")};
  width: 100%;
  height: calc(100vh - var(--minusHeight));
`;

const LeftSide = styled.aside`
  flex-shrink: 0;
  width: 350px; // 8.22 width 수정 (425 -> 350)
  height: 100%;
`;

const RightSide = styled.section`
  --leftSide: 350px; // 8.22 width 수정 (425 -> 350)

  ${flex("start", "start", false)};
  width: calc(100% - var(--leftSide));
  height: 100%;
`;

export default Main;
