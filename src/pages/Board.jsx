import React from "react";
import styled from "styled-components";
import Chart from "../feature/board/Chart";

const Board = () => {
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
