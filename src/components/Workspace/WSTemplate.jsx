import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import flex from "../../themes/flex";
import ChatBtn from "../../feature/chat/ChatBtn";
import checkDesktop from "../../functions/checkDesktop";
// import EventBtn from "../EventBtn";

const WSTemplate = ({ children }) => {
  const isShowSidebar = useSelector((state) => state.resize.isShowSidebar);
  const { pathname } = useLocation();

  return (
    <Template sidebar={isShowSidebar}>
      {children}
      {pathname.includes("chat") === false &&
        (!checkDesktop() || window.innerWidth < 1024) && <ChatBtn />}
      {/* <EventBtn /> */}
    </Template>
  );
};

const Template = styled.main`
  --header: 48px;

  ${flex("between", "start")};
  position: relative;
  width: ${(props) => (props.sidebar ? `calc(100% - 260px);` : `100%;`)};
  padding: 0;
  padding-top: var(--header);
  box-sizing: border-box;
  transition: width 500ms ease-in-out;
  overflow: hidden;

  ${({ theme }) => theme.device.tablet} {
    width: 100%;
    overflow: auto;
  }
`;

export default WSTemplate;
