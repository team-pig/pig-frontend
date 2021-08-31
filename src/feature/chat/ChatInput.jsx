import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";

// component & elem
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import { body_3 } from "../../themes/textStyle";
import { IconBtn } from "../../elem";

// socket
import { sendMessage } from "../../shared/useSocket";

const ChatInput = () => {
  const { roomId } = useParams();

  const { userId, nickname } = useSelector((state) => state.user.user);

  const inputRef = useRef();

  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const toggleEmoji = useCallback(() => setShowEmoji((pre) => !pre), []);

  const clickEmoji = useCallback(
    (e, emoji) => {
      setText((pre) => pre + emoji.emoji);
      inputRef.current.focus(); // 이모티콘 선택 후 바로 텍스트 입력할 수 있도록 focus
      toggleEmoji();
    },
    [toggleEmoji]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!text.trim()) return;
      sendMessage(roomId, nickname, userId, text);
      setText("");
    },
    [nickname, roomId, text, userId]
  );

  return (
    <InputBox onSubmit={handleSubmit}>
      {showEmoji && (
        <PickerContainer>
          <Picker onEmojiClick={clickEmoji} pickerStyle={{ width: "100%" }} />
        </PickerContainer>
      )}
      <Input
        type="text"
        placeholder="메세지를 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
      />

      <IconBtn type="button" onClick={toggleEmoji}>
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
  padding-bottom: 1px;
  margin-left: -1px;
  background-color: var(--white);
  border: 1px solid var(--line);
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  ${({ theme }) => theme.device.tablet} {
    border: none;
    border-top: 1px solid var(--line);
  }
`;

const Input = styled.input`
  ${body_3};
  flex-grow: 1;
  height: 100%;
  padding: 0 10px;
  color: var(--black);

  &::placeholder {
    ${body_3};
    color: var(--grey);
  }
`;

const PickerContainer = styled.div`
  --inputbox: 42px;

  position: absolute;
  right: 0;
  bottom: var(--inputbox);

  ${({ theme }) => theme.device.tablet} {
    max-width: 300px;
  }
`;

export default ChatInput;
