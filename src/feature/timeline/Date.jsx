import React from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";

// redux
import { setCurrentId } from "../../redux/modules/calendar";

import { Text } from "../../elem";
import flex from "../../themes/flex";

const Date = ({ idx, list, today, thisMonth, children, _onClick }) => {
  const dispatch = useDispatch();

  const clickSchedule = (cardId) => {
    _onClick();
    dispatch(setCurrentId(cardId));
  };

  return (
    <>
      <DateContainer idx={idx} onClick={_onClick}>
        <DateBox thisMonth={thisMonth}>
          <DateNum type="body_2" today={today} idx={idx}>
            {children}
          </DateNum>
        </DateBox>
        {list.map((item, idx) => {
          const { cardId, cardTitle, color } = item;
          // 누르면 모달 보이도록 기능 추가 필요
          if (idx >= 2) return null;

          return (
            <ScheduleBtn
              key={cardId}
              onClick={(e) => {
                e.stopPropagation();
                clickSchedule(cardId);
              }}
              color={color}
              thisMonth={thisMonth}
            >
              <ScheduleText type="body_3" color={color}>
                {cardTitle}
              </ScheduleText>
            </ScheduleBtn>
          );
        })}
      </DateContainer>
    </>
  );
};

const DateContainer = styled.div`
  ${flex("start", "center", false)};
  border-right: ${(props) => props.idx % 7 !== 6 && `1px solid var(--line);`};
  border-bottom: ${(props) => props.idx < 35 && `1px solid var(--line)`};
  cursor: pointer;
`;

const DateBox = styled.div`
  ${flex("end")};
  width: 100%;
  height: 32px;
  padding: 0 4px;
  opacity: ${(props) => !props.thisMonth && "50%;"};
`;

const DateNum = styled(Text)`
  ${flex()};
  width: 24px;
  height: 24px;
  color: ${(props) =>
    props.idx % 7 === 0 ? "var(--notice);" : "var(--darkgrey);"};
  ${(props) => {
    if (props.today)
      return css`
        color: var(--white);
        background-color: var(--notice);
        border-radius: 50%;
        padding-top: 1px;
        padding-left: 0.5px;
      `;
  }}
`;
const ScheduleBtn = styled.div`
  --margin: 6px;
  ${flex("start")}
  width: calc(100% - (var(--margin) * 2));
  height: 24px;
  padding: 0 10px;
  margin-bottom: 6px;
  background-color: ${(props) => `${props.theme.colors[props.color]}`};
  border-radius: 4px;
  opacity: ${(props) => !props.thisMonth && "20%;"};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const ScheduleText = styled(Text)`
  width: 100 - 20px;
  white-space: nowrap;
  overflow: hidden;
  color: ${(props) =>
    props.color === "yellow" || props.color === "mint"
      ? "var(--darkgrey);"
      : "var(--white);"};
  text-overflow: ellipsis;
`;

export default Date;
