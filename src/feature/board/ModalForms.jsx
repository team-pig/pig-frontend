import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DatePickerExample from "./DatePicker";

// function
import setDday from "../../functions/setDday";

// component & elem
import BoardDrop from "./BoardDrop";
import InputToggle from "../../components/InputToggle";
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import { Text } from "../../elem";
import { body_2, body_3, sub_1 } from "../../themes/textStyle";

// redux
import { resetTodos } from "../../redux/modules/todos";
import { __editCardInfos, resetCard } from "../../redux/modules/board";

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

  const dDay = setDday(content.endDate);

  return (
    <Container>
      <ModalHeader>
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
        <Title type="sub_1">
          <InputToggle
            name="cardTitle"
            value={content.cardTitle}
            saveFunc={editFunc}
            limit={15}
          />
        </Title>
      </ModalHeader>

      <DateInput>
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
        <DueDate>
          <DateText>{dDay}</DateText>
        </DueDate>
      </DateInput>
      <DescContainer>
        <TodoContainer>
          <InputToggle
            resize="none"
            name="desc"
            placeholder="내용을 입력해주세요."
            value={content.desc}
            shape="textarea"
            saveFunc={editFunc}
            limit={"제한없음"}
          />
        </TodoContainer>
      </DescContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
`;

const ModalHeader = styled.div`
  ${flex("start", "center")};
  gap: 10px;
  padding: 10px 0 0 0;
`;

const Title = styled.h1`
  ${sub_1}
  width: 100%;
`;

const DescContainer = styled.div`
  width: 480px;
  height: 180px;
  padding: 10px;
  border: 1px solid var(--line);
`;

const DateInput = styled.div`
  ${flex("end", "center")};
  margin: 0 0 6px auto;
`;

const DueDate = styled.div`
  ${flex()}
`;

const TodoContainer = styled(Text)`
  ${body_3};
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const DateText = styled(Text)`
  ${flex("end", "center")};
  ${body_2};
  width: 44px;
  color: var(--notice);
`;

export default ModalForms;
