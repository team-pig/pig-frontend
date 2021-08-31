import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import Icon from "../../components/Icon";
import flex from "../../themes/flex";

const ChatBtn = () => {
  const history = useHistory();
  const { roomId } = useParams();

  return (
    <RoundBtn onClick={() => history.push(`/workspace/${roomId}/chat`)}>
      <Icon icon="chat" size="24px" color="var(--white)" />
    </RoundBtn>
  );
};

const RoundBtn = styled.button`
  ${flex()}
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--main);

  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export default ChatBtn;
