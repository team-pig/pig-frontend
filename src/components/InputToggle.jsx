import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

// elem
import { Text } from "../elem";

const InputToggle = ({
  name,
  shape,
  value = "",
  saveFunc,
  placeholder,
  resize,
}) => {
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
          rows="10"
          name={name}
          placeholder={placeholder}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyPress={handleEnterEvent}
        />
      );
    }

    if (shape === "date") {
      return (
        <EditInput
          type="date"
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
      {editMode ? (
        returnShape()
      ) : (
        <TextAreaResult>{currentValue}</TextAreaResult>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const EditInput = styled.input`
  width: 100%;
  height: 100%;
  cursor: text !important;
  border: none;
  font-size: inherit;
  outline: none;
  text-align: center;
  border-bottom: 1px solid var(--line);
  text-align: left;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  /* height: 100%; */
  resize: none;
`;

const TextAreaResult = styled(Text)`
  word-break: break-all;
  /* overflow-y: auto; */
`;

export default InputToggle;
