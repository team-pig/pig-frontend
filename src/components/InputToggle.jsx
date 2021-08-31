import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";

// elem
import { Text } from "../elem";
import { scrollbar } from "../themes/scrollbar";
import { body_3 } from "../themes/textStyle";
import CountText from "./CountText";

const InputToggle = ({
  name,
  shape,
  value = "",
  saveFunc,
  placeholder,
  padding,
  limit,
  maxLength,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const myRef = useRef();

  const handleSave = (saveValue) => {
    saveFunc(name, saveValue);
    setEditMode((pre) => !pre);
  };

  const changeToEditMode = (e) => {
    e.stopPropagation();
    setEditMode((pre) => !pre);
  };

  // Input 외 영역 클릭 시 저장
  useEffect(() => {
    const handleClickOutside = (e) => {
      e.stopPropagation();
      if (myRef.current && !myRef.current.contains(e.target)) {
        if (myRef.current.value !== "") handleSave(myRef.current.value); // value === "" 일 때 저장 방지
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [myRef]);

  const handleEnterEvent = (e) => {
    if (e.target.value !== "" && e.key === "Enter") handleSave(currentValue); // value === "" 일 때 저장 방지
  };

  const returnShape = () => {
    if (shape === "textarea") {
      return (
        <>
          <EditTextarea
            autoComplete="off"
            ref={myRef}
            rows="10"
            name={name}
            maxLength={maxLength ? maxLength : limit}
            placeholder={placeholder}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
          {limit && CountText(limit, currentValue.length)}
        </>
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
          padding={padding}
        />
      );
    }

    return (
      <InputBox>
        <EditInput
          autoComplete="off"
          type="text"
          ref={myRef}
          name={name}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyPress={handleEnterEvent}
          padding={padding}
          maxLength={maxLength ? maxLength : limit}
          autoFocus
        />

        {/* <HelpMsg>{limit && CountText(limit, currentValue.length)}</HelpMsg> */}
      </InputBox>
    );
  };

  return (
    <Container
      onClick={!editMode ? changeToEditMode : null}
      editMode={editMode}
    >
      {editMode ? (
        returnShape()
      ) : (
        <TextAreaResult>{currentValue}</TextAreaResult>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${scrollbar};
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  ${(props) =>
    props.border &&
    css`
      border: 1px solid var(--line);
    `}
  ${(props) =>
    !props.editMode &&
    css`
      cursor: pointer;
    `}
`;

const EditInput = styled.input`
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: text !important;
  border: none;
  font-size: inherit;
  outline: none;
  text-align: left;
`;

const EditTextarea = styled.textarea`
  ${body_3};
  width: 100%;
  padding: 0;
  resize: none;
  overflow-y: hidden;
`;

const TextAreaResult = styled(Text)`
  cursor: pointer !important;
  word-break: break-all;
  white-space: pre-wrap;
  overflow-y: auto;
  border-bottom: 1px solid transparent;
`;

const InputBox = styled.div`
  position: relative;
`;

// const HelpMsg = styled.div`
//   ${({ theme }) => theme.device.mobile} {
//     display: none;
//   }
// `;

export default InputToggle;
