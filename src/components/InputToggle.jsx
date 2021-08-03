import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

// elem
import { Text } from "../elem";

const InputToggle = ({ name, shape, value = "", saveFunc }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const myRef = useRef();

  const handleSave = (saveValue) => {
    saveFunc(name, saveValue);
    setEditMode((pre) => !pre);
  };

  // Input 외 영역 클릭 시 저장
  useEffect(() => {
    const handleClickOutside = (e) => {
      e.stopPropagation();
      if (myRef.current && !myRef.current.contains(e.target)) {
        handleSave(myRef.current.value);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [myRef]);

  // 엔터 눌렀을 때 저장
  const handleEnterEvent = (e) => {
    if (e.key === "Enter") handleSave(currentValue);
  };

  const returnShape = () => {
    if (shape === "textarea") {
      return (
        <EditTextarea
          ref={myRef}
          name={name}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyPress={handleEnterEvent}
        />
      );
    }

    return (
      <EditInput
        type="text"
        ref={myRef}
        name={name}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyPress={handleEnterEvent}
      />
    );
  };

  return (
    <Container onClick={!editMode ? () => setEditMode((pre) => !pre) : null}>
      {editMode ? returnShape() : <Text>{currentValue}</Text>}
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

const EditTextarea = styled.textarea`
  width: 100%;
  height: 100%;
`;

export default InputToggle;
