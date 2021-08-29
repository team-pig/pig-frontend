import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import flex from "../../themes/flex";
import EventBtn from "../EventBtn";

const WSTemplate = ({ children }) => {
  const isShowSidebar = useSelector((state) => state.resize.isShowSidebar);

  return (
    <Template sidebar={isShowSidebar}>
      {children}
      <EventBtn />
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

  ${({ theme }) => theme.device.mobile} {
    --mobileNav: 60px;
  }
`;

export default WSTemplate;
