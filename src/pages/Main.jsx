import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import StatusSection from "../feature/main/StatusSection";
import Information from "../feature/main/Information";
import MyTodos from "../feature/main/MyTodos";
import JoyrideContainer from "../feature/tutorial/JoyrideContainer";
import { mainSteps } from "../feature/tutorial/tutorialSteps";

import flex from "../themes/flex";
import { hiddenScroll } from "../themes/hiddenScroll";

import { __loadMyTodos, __loadProjectTodo } from "../redux/modules/todos";

const Main = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const tutorial = useSelector((state) => state.user.tutorial);

  useEffect(() => {
    dispatch(__loadMyTodos(roomId)); // 메인 (투두리스트)
    dispatch(__loadProjectTodo(roomId)); // 메인 (대시보드)
  }, [dispatch, roomId]);

  // Joyride(튜토리얼)
  const [isShowTutorial, setIsShowTutorial] = useState(false);

  useEffect(() => {
    if (tutorial && tutorial["main"] === true && isShowTutorial === false) {
      setIsShowTutorial(true);
    }
  }, [tutorial]);

  return (
    <>
      <JoyrideContainer
        run={isShowTutorial}
        setRun={setIsShowTutorial}
        steps={mainSteps}
        page="main"
      />
      <Container className="ws-main">
        <StatusSection />
        <Information />
        <MyTodos />
      </Container>
    </>
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

export default memo(Main);
