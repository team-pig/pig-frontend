import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "../feature/board/Chart";
import { __loadBucket, __loadCard } from "../redux/modules/board";
import JoyrideContainer from "../feature/tutorial/JoyrideContainer";
import { boardSteps } from "../feature/tutorial/tutorialSteps";

const Board = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const tutorial = useSelector((state) => state.user.tutorial);

  useEffect(() => {
    dispatch(__loadBucket(roomId)); // 보드 (버킷 정보)
    dispatch(__loadCard(roomId)); // 보드 (카드 정보)
  }, []);

  // Joyride(튜토리얼)
  const [isShowTutorial, setIsShowTutorial] = useState(false);

  useEffect(() => {
    if (tutorial && tutorial["board"] === true && isShowTutorial === false) {
      setIsShowTutorial(true);
    }
  }, [tutorial]);

  return (
    <>
      <JoyrideContainer
        run={isShowTutorial}
        setRun={setIsShowTutorial}
        steps={boardSteps}
        page="board"
      />
      <BoardContainer className="ws-board">
        <Chart />
      </BoardContainer>
    </>
  );
};

const BoardContainer = styled.section`
  width: 100%;
  height: calc(100vh - 48px);
  overflow-x: auto;
  overflow-y: auto;
`;

export default Board;
