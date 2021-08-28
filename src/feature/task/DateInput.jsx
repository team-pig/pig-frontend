import React, { forwardRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

// datepicker package
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import "../../themes/react-datepicker.css";

// compo & elem & utill
import flex from "../../themes/flex";
import Icon from "../../components/Icon";

// redux
import { useDispatch } from "react-redux";
import { __editCardInfos } from "../../redux/modules/board";
registerLocale("ko", ko);

const DateInput = ({ type, source, card }) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  /**
   * react-datepicker 커스텀 인풋 : style 수정은 themes/react-datepicker.css 파일에서 적용
   */
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
        selected={
          card && type === "start"
            ? new Date(card.startDate)
            : new Date(card.endDate)
        }
        onChange={(date) => {
          const formatDate = moment(date).format("YYYY-MM-DD");
          if (type === "start") {
            const diffDay = moment(card.endDate).diff(
              moment(date).format("YYYY-MM-DD"),
              "days"
            );
            if (diffDay <= 0) {
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
