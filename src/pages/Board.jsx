import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "../feature/board/Chart";
import { __loadBucket, __loadCard } from "../redux/modules/board";

const Board = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadBucket(roomId)); // 보드 (버킷 정보)
    dispatch(__loadCard(roomId)); // 보드 (카드 정보)
  }, []);

  return (
    <BoardContainer>
      <Chart />
    </BoardContainer>
  );
};

const BoardContainer = styled.section`
  width: 100%;
  height: calc(100vh - 48px);
  overflow-x: auto;
  overflow-y: auto;
`;

export default Board;
