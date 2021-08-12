import React, { useEffect } from "react";
import Chart from "../feature/board/Chart";
import { __loadMembers } from "../redux/modules/member";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const Board = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadMembers(roomId));
  }, []);

  return <Chart />;
};

export default Board;
