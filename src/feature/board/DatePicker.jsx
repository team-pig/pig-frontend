import React from "react";
import { ko } from "date-fns/locale";
import { getDay } from "date-fns";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { useDispatch } from "react-redux";
import "../../themes/niceDate.css";
import { __editCardInfos } from "../../redux/modules/board";
import moment from "moment";
import styled from "styled-components";

const modifiers = {
  // disabled: (date) => getDay(date) === 6, // Disables Saturdays
  highlight: (date) => getDay(date) === 2,
};

const modifiersClassNames = {
  highlight: "-highlight",
};

const DatePickerExample = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  roomId,
  cardId,
  content,
}) => {
  const dispatch = useDispatch();
  return (
    <DateRangePicker
      modifiersClassNames={modifiersClassNames}
      modifiers={modifiers}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={(date) => {
        const formatDate = moment(date).format("YYYY-MM-DD");
        setStartDate(date);
        dispatch(__editCardInfos(roomId, { cardId, startDate: formatDate }));
      }}
      onEndDateChange={(date) => {
        const formatDate = moment(date).format("YYYY-MM-DD");
        setEndDate(date);
        dispatch(__editCardInfos(roomId, { cardId, endDate: formatDate }));
      }}
      minimumDate={new Date()}
      minimumLength={0}
      format="yyyy-MM-dd"
      locale={ko}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <Container className="date-range">
          <StInput
            className={"input" + (focus === START_DATE ? " -focused" : "")}
            {...startDateInputProps}
            placeholder={`${
              content.startDate === undefined
                ? "YYYY. MM. DD"
                : content.startDate
            }`}
          />
          <span className="date-range_arrow" />
          <div> - </div>
          <StInput
            className={"input" + (focus === END_DATE ? " -focused" : "")}
            {...endDateInputProps}
            placeholder={`${
              content.endDate === undefined ? "YYYY. MM. DD" : content.endDate
            }`}
          />
        </Container>
      )}
    </DateRangePicker>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const StInput = styled.input`
  width: 106px;
  height: 42px;
  text-align: center;
`;
export default DatePickerExample;
