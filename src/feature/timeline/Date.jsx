import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// redux
import { setCurrentId } from "../../redux/modules/calendar";

import { Text } from "../../elem";
import flex from "../../themes/flex";
import { hiddenScroll } from "../../themes/hiddenScroll";
import { body_4 } from "../../themes/textStyle";

const Date = ({ idx, list, today, thisMonth, children, _onClick }) => {
  const dispatch = useDispatch();

  const { isMobile } = useSelector((state) => state.resize);

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
        <ScheduleBtns>
          {!isMobile &&
            list.map((item, idx) => {
              const { cardId, cardTitle, color } = item;
              // if (idx >= 2) return null;
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
          {isMobile && list.length !== 0 && <ScheduleDot />}
        </ScheduleBtns>
      </DateContainer>
    </>
  );
};

const DateContainer = styled.div`
  ${flex("start", "center", false)};
  border-right: ${(props) => props.idx % 7 !== 6 && `1px solid var(--line);`};
  border-bottom: ${(props) => props.idx < 35 && `1px solid var(--line)`};
  cursor: pointer;

  ${({ theme }) => theme.device.mobile} {
    border-right: 0;
    transition: background-color 100ms ease-in-out;

    &:hover {
      background-color: var(--line);
    }
  }
`;

const DateBox = styled.div`
  ${flex("end")};
  width: 100%;
  height: 32px;
  padding: 0 4px;
  opacity: ${(props) => !props.thisMonth && "50%;"};

  ${({ theme }) => theme.device.mobile} {
    justify-content: center;
    height: 24px;
  }
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

  ${({ theme }) => theme.device.mobile} {
    ${body_4};
    width: 20px;
    height: 20px;
  }
`;

const ScheduleBtns = styled.div`
  --dateBox: 32px;

  ${flex("start", "center", false)};
  ${hiddenScroll}
  width: 100%;
  height: calc(100% - var(--dateBox));
  overflow: auto;
`;

const ScheduleBtn = styled.div`
  --margin: 6px;
  ${flex("start")}
  flex-shrink: 0;
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

  ${({ theme }) => theme.device.tablet} {
    height: 18px;
  }

  ${({ theme }) => theme.device.mobile} {
    flex-direction: row;
  }
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

  ${({ theme }) => theme.device.tablet} {
    ${body_4};
  }
`;

const ScheduleDot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--notice);
    transform: translate(-50%, -50%);
  }
`;
export default Date;
