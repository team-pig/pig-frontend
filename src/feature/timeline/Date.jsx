import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __loadDaySchedules } from "../../redux/modules/calendar";

const Date = ({ list, children }) => {
  const { roomId } = useParams;

  const dispatch = useDispatch();

  const clickDate = (idAry) => {
    // dispatch(__loadDaySchedules(roomId, idAry));
  };

  return (
    <>
      <DateBox
        onClick={(e) => {
          const idAry = list.map((item) => item.scheduleId);
          e.stopPropagation();
          clickDate(idAry);
        }}
      >
        <DateNum>{children}</DateNum>
        {list.map((item) => {
          const { scheduleId: id, scheduleTitle: title } = item;
          return <button key={id}>{title}</button>;
        })}
      </DateBox>
    </>
  );
};

const DateBox = styled.div``;

const DateNum = styled.div``;

export default Date;
