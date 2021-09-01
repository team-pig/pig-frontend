import React from "react";
import styled from "styled-components";

import Notice from "./Notice";
import RoomMember from "./RoomMember";
import Chat from "../../feature/chat/Chat";
import { IconBtn } from "../../elem";
import Icon from "../Icon";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar } from "../../redux/modules/resize";

const WSSidebar = () => {
  const dispatch = useDispatch();

  const isShowSidebar = useSelector((state) => state.resize.isShowSidebar);

  const handleSidebar = () => dispatch(showSidebar());

  return (
    <>
      <Container sidebar={isShowSidebar} className="chat-sidebar">
        <Notice _onClick={handleSidebar} />
        {/* <RoomMember /> */}
        <Chat />
      </Container>
      {!isShowSidebar && (
        <IconBox _onClick={handleSidebar}>
          <Icon icon="arrow-down" size="20px" color="var(--darkgrey)" />
        </IconBox>
      )}
    </>
  );
};

const Container = styled.aside`
  --header: 48px;
  --minusHeight: calc(var(--header));

  position: fixed;
  top: 48px;
  right: ${(props) => (props.sidebar ? 0 : `-280px;`)};
  flex-shrink: 0;
  flex-grow: 0;
  z-index: var(--indexSidebar);
  width: 260px;
  height: calc(100vh - var(--minusHeight));
  border-left: 1px solid var(--line);
  background-color: var(--white);
  transition: right 500ms ease-in-out;
`;

const IconBox = styled(IconBtn)`
  position: fixed;
  top: 50vh;
  right: 10px;
  border-radius: 50%;
  transform: rotate(90deg);
  z-index: 20;
  transition: display 500ms ease-in-out;
  transition-delay: 2s;
`;

export default WSSidebar;
