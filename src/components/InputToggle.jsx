import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

// elem
import { Text } from "../elem";

const InputToggle = ({ value = "", saveFunc }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const myRef = useRef();

  const handleSave = () => {
    setEditMode((pre) => !pre);
    // saveFunc();
  };

  // Input 외 영역 클릭 시 저장
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (myRef.current && !myRef.current.contains(e.target)) handleSave();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mosedown", handleClickOutside);
  }, [myRef]);

  // 엔터 눌렀을 때 저장
  const handleEnterEvent = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <Container onClick={!editMode ? () => setEditMode((pre) => !pre) : null}>
      {editMode ? (
        <EditInput
          type="text"
          value={currentValue}
          ref={myRef}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyPress={handleEnterEvent}
        />
      ) : (
        <Text>{currentValue}</Text>
      )}
    </Container>
  );
};

// 임시 스타일
const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: lightgray;
`;

const EditInput = styled.input`
  margin: 0 auto;
  cursor: text !important;
  border: none;
  font-size: 24px;
  border-radius: 10px;
  outline: none;
  height: 60px;
  width: 90%;
  text-align: center;
`;

export default InputToggle;
