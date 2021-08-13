import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DatePickerExample from "./DatePicker";
import moment from "moment";

import { resetTodos } from "../../redux/modules/todos";
import { __editCardInfos, resetCard } from "../../redux/modules/board";

import BoardDrop from "./BoardDrop";
import InputToggle from "../../components/InputToggle";
import { scrollbar } from "../../themes/scrollbar";
import { Text } from "../../elem";
import flex from "../../themes/flex";
import Icon from "../../components/Icon";

const ModalForms = ({ content }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // 전역변수
  const { roomId } = useParams();

  useEffect(() => {
    return () => {
      dispatch(resetCard());
      dispatch(resetTodos());
    };
  }, [dispatch]);

  const editFunc = (key, value) => {
    const editObj = { cardId: content.cardId, [key]: value };
    dispatch(__editCardInfos(roomId, editObj));
  };

  const kindOfColor = ["blue", "violet", "yellow", "orange", "mint"];

  const dDay =
    parseInt(
      moment(
        moment(content.endDate).diff(moment().format("YYYY-MM-DD"))
      ).format("D")
    ) - 1;

  return (
    <Container>
      <StyleDiv wh={["480px", "26px"]} mg="0 0 20px 0">
        <StyleDiv flex={["flex-start", "center", "10"]}>
          <BoardDrop.Container
            componentType="colorPicker"
            bgColor={content.color}
          >
            {kindOfColor.map((color, idx) => (
              <BoardDrop.Item
                key={idx}
                componentType="colorPicker"
                color={color}
                _onClick={() => {
                  editFunc("color", color);
                }}
              >
                {content.color === color && <Icon icon="check" size="20px" />}
              </BoardDrop.Item>
            ))}
          </BoardDrop.Container>
          <StText type="sub_1">
            <InputToggle
              name="cardTitle"
              value={content.cardTitle}
              saveFunc={editFunc}
              limit={15}
            />
          </StText>
        </StyleDiv>
      </StyleDiv>

      <StyleDiv mg="0 0 6px auto" flex={["flex-end", "center"]}>
        <DatePickerExample
          cardId={content.cardId}
          roomId={roomId}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          content={content}
          mode="card" // card or schedule
        />
        <StyleDiv flex={["center", "center"]}>
          <DateText type="body_2" color="notice">
            {dDay !== 0 ? `D-${dDay}` : "D-DAY"}
          </DateText>
        </StyleDiv>
      </StyleDiv>
      <StyleDiv
        wh={["480px", "180px"]}
        pd="10px"
        border="1px solid var(--line)"
      >
        <StText type="body_3">
          <InputToggle
            resize="none"
            name="desc"
            placeholder="내용을 입력해주세요."
            value={content.desc}
            shape="textarea"
            saveFunc={editFunc}
            limit={"제한없음"}
          />
        </StText>
      </StyleDiv>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
`;

const StyleDiv = styled.div`
  position: relative;

  ${(props) =>
    props.tb &&
    css`
      border: 1px solid red;
    `}
  ${(props) =>
    props.wh &&
    css`
      width: ${props.wh[0]};
      height: ${props.wh[1]};
    `}
    
  ${(props) =>
    props.flex &&
    css`
      display: flex;
      justify-content: ${props.flex[0]};
      align-items: ${props.flex[1]};
      gap: ${props.flex[2]}px;
    `}
  padding: ${(props) => props.pd};
  margin: ${(props) => props.mg};
  border: ${(props) => props.border};
`;

const StText = styled(Text)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const DateText = styled(Text)`
  ${flex("end", "center")};
  width: 44px;
`;

export default ModalForms;
