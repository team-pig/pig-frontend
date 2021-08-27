import React, { useState, forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import styled from "styled-components";
import flex from "../../themes/flex";
import "../../themes/react-datepicker.css";
import Icon from "../../components/Icon";
import moment from "moment";
import { useDispatch } from "react-redux";
import { __editCardInfos } from "../../redux/modules/board";
import { useParams } from "react-router-dom";

registerLocale("ko", ko);

const DateInput = ({ type, source, card }) => {
  console.log(source);
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [startDate, setStartDate] = useState(new Date(card.startDate));
  const [endDate, setEndDate] = useState(new Date(card.endDate));
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </div>
  ));

  return (
    <>
      <DatePicker
        dateFormat="yyyy. MM. dd(eee)"
        customInput={<ExampleCustomInput />}
        minDate={type === "end" ? new Date(card.startDate) : ""}
        locale="ko"
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => {
          return (
            <HeaderWrapper>
              <Button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <Icon icon="arrow-left" size="24px" />
              </Button>
              <Month>
                {moment(date).format("YYYY")} 년 {moment(date).format("MM")} 월
              </Month>
              <Button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <Icon icon="arrow-right" size="24px" />
              </Button>
            </HeaderWrapper>
          );
        }}
        selected={type === "start" ? startDate : endDate}
        onChange={(date) => {
          const formatDate = moment(date).format("YYYY-MM-DD");
          if (type === "start") {
            setStartDate(date);
            dispatch(
              __editCardInfos(
                roomId,
                {
                  cardId: card.cardId,
                  startDate: formatDate,
                },
                source
              )
            );
          } else if (type === "end") {
            setEndDate(date);
            dispatch(
              __editCardInfos(
                roomId,
                {
                  cardId: card.cardId,
                  endDate: formatDate,
                },
                source
              )
            );
          }
        }}
      />
    </>
  );
};

const HeaderWrapper = styled.div`
  ${flex("between")}
  width: 100%;
  height: 30px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 1.6rem;
`;
const Month = styled.div``;

const Button = styled.button`
  transition: 200ms ease-in-out transform;
  &:hover {
    transform: scale(1.1);
  }
`;
export default DateInput;
