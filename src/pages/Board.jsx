import React, { useEffect } from "react";
import Chart from "../feature/board/Chart";
import Template from "../components/Template";
import { __loadMembers } from "../redux/modules/member";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const Board = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  console.log(roomId);

  useEffect(() => {
    dispatch(__loadMembers(roomId));
  }, []);

  return (
    <Template>
      <Chart />
    </Template>
  );
};

export default Board;
