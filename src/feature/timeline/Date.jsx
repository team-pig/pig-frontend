import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Date = ({ list, children }) => {
  const clickDate = (idAry) => {
    // dispatch(__loadDaySchedules(roomId, idAry));
  };

  return (
    <>
      <DateBox
        onClick={(e) => {
          const idAry = list.map((item) => item.cardId);
          e.stopPropagation();
          clickDate(idAry);
        }}
      >
        <DateNum>{children}</DateNum>
        {list.map((item) => {
          const { cardId, cardTitle } = item;
          return <button key={cardId}>{cardTitle}</button>;
        })}
      </DateBox>
    </>
  );
};

const DateBox = styled.div``;

const DateNum = styled.div``;

export default Date;
