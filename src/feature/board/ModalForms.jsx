import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Text } from "../../elem";
import { __editCardInfos, resetCard } from "../../redux/modules/board";

import styled, { css } from "styled-components";
import InputToggle from "../../components/InputToggle";

// import "react-datepicker/dist/react-datepicker.css";

const ModalForms = ({ content, setContent }) => {
  const dispatch = useDispatch();

  // 전역변수
  const { roomId } = useParams();

  useEffect(() => {
    return () => {
      dispatch(resetCard());
    };
  }, []);

  const editFunc = (key, value) => {
    const editObj = { cardId: content.cardId, [key]: value };
    dispatch(__editCardInfos(roomId, content.cardId, editObj));
  };

  return (
    <Container>
      <StyleDiv wh={["480px", "26px"]} mg="0 0 20px 0">
        <StyleDiv flex={["flex-start", "center", "10"]}>
          <Dot bg="red" />
          <Text type="sub_1">
            <InputToggle
              name="cardTitle"
              value={content.cardTitle}
              saveFunc={editFunc}
            />
          </Text>
        </StyleDiv>
      </StyleDiv>

      <StyleDiv mg="0 0 6px auto" flex={["flex-end", "center"]}>
        <StyleDiv wh={["170px", "50px"]} pd="10px" flex={["center", "center"]}>
          <StText type="body_2">
            <InputToggle
              shape="date"
              name="startDate"
              saveFunc={editFunc}
              value={content.startDate}
            />
          </StText>
        </StyleDiv>

        <StyleDiv wh={["170px", "50px"]} pd="10px" flex={["center", "center"]}>
          <StText type="body_2">
            <InputToggle
              shape="date"
              name="endDate"
              saveFunc={editFunc}
              value={content.endDate}
            />
          </StText>
        </StyleDiv>

        <StyleDiv flex={["center", "center"]}>
          <Text type="body_2">D-3</Text>
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
          />
        </StText>
      </StyleDiv>

      {/* <div>
        <select name="color" onChange={editContentHandler}>
          <option>red</option>
          <option>blue</option>
          <option>green</option>
        </select>
      </div> */}
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
`;

const StyleDiv = styled.div`
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

const Dot = styled.div`
  background-color: ${(props) => props.bg};
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const StText = styled(Text)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export default ModalForms;
