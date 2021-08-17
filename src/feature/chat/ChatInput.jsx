import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// component & elem
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import { body_3 } from "../../themes/textStyle";
import { IconBtn } from "../../elem";

// socket
import { sendMessage } from "../../shared/useSocket";

const ChatInput = () => {
  const { roomId } = useParams();

  const dispatch = useDispatch();

  const { userId, nickname } = useSelector((state) => state.user.user);

  const [text, setText] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendMessage(roomId, nickname, text);
      setText("");
    },
    [nickname, roomId, text]
  );

  return (
    <InputBox onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="메세지를 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IconBtn>
        <Icon icon="smile" size="20px" color="var(--grey)" />
      </IconBtn>
    </InputBox>
  );
};

const InputBox = styled.form`
  ${flex("between", "center")};
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 42px;
  padding: 0 4px;
  margin-left: -1px;
  border: 1px solid var(--line);
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
`;

const Input = styled.input`
  ${body_3};
  flex-grow: 1;
  color: var(--black);
  padding: 0 10px;

  &::placeholder {
    ${body_3};
    color: var(--grey);
  }
`;

export default ChatInput;
