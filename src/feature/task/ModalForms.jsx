import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// function
import setDday from "../../functions/setDday";

// component & elem
import BoardDrop from "../board/BoardDrop";
import InputToggle from "../../components/InputToggle";
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import { Text } from "../../elem";
import { body_2, body_3, sub_1 } from "../../themes/textStyle";

// redux
import { resetTodos } from "../../redux/modules/todos";
import { __editCardInfos, resetCard } from "../../redux/modules/board";
import DateInput from "./DateInput";
import BucketSelect from "../timeline/BucketSelect";
import { resetCardTocalendar } from "../../redux/modules/calendar";

/**
 *
 * source : 모달을 on 한 출발지 ("board" || "calendar")
 * source 별로 dispatch 함수와 컴포넌트를 조건부로 실행시킴
 */

const ModalForms = ({ content, source }) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    return () => {
      dispatch(resetCard());
      dispatch(resetCardTocalendar());
      dispatch(resetTodos());
    };
  }, [dispatch]);

  const editFunc = (key, value) => {
    const editObj = { cardId: content.cardId, [key]: value };
    dispatch(__editCardInfos(roomId, editObj, source));
  };

  const colors = ["blue", "violet", "yellow", "orange", "mint"];
  const dDay = setDday(content.endDate);

  return (
    <Container>
      {source === "calendar" && (
        <BucketSelect bucketId={content.bucketId} cardId={content.cardId} />
      )}
      <ModalHeader source={source}>
        <BoardDrop.Container
          componentType="colorPicker"
          bgColor={content.color}
        >
          {colors.map((color, idx) => (
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
        <Title>
          <InputToggle
            name="cardTitle"
            value={content.cardTitle}
            saveFunc={editFunc}
            limit={15}
          />
        </Title>
      </ModalHeader>
      {content && (
        <DueDate>
          <DateInput type="start" mode="card" card={content} source={source} />
          {"~"}
          <DateInput type="end" mode="card" card={content} source={source} />
          <DateText>{dDay}</DateText>
        </DueDate>
      )}

      <DescContainer>
        <TodoContainer>
          <InputToggle
            resize="none"
            name="desc"
            placeholder="내용을 입력해주세요."
            value={content.desc}
            shape="textarea"
            saveFunc={editFunc}
            limit={200}
          />
        </TodoContainer>
      </DescContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  position: relative;

  ${({ theme }) => theme.device.mobile} {
    padding: 20px;
  }
`;

const ModalHeader = styled.div`
  ${flex("start", "center")};
  gap: 10px;
  padding: 20px 0 0 0;
  margin-top: ${(props) => props.source === "calendar" && "30px"};
  margin-bottom: 24px;
`;

const Title = styled.h1`
  ${sub_1}
  width: 100%;
`;

const DescContainer = styled.div`
  width: 100%;
  height: 180px;
  padding: 10px;
  border: 1px solid var(--line);
  ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const DueDate = styled.div`
  ${flex("end")}
`;

const TodoContainer = styled(Text)`
  ${body_3};
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const DateText = styled(Text)`
  ${flex()};
  ${body_2};
  width: 44px;
  color: var(--notice);
`;

export default ModalForms;
