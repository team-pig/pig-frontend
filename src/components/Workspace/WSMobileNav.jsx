import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// component
import Icon from "../Icon";
import { mobileOnly } from "../../themes/responsive";
import flex from "../../themes/flex";
import { Text } from "../../elem";

// redux
import { __getDocs } from "../../redux/modules/document";

const WSMobileNav = ({ url }) => {
  const history = useHistory();
  const { roomId } = useParams();

  const dispatch = useDispatch();

  const docs = useSelector((state) => state.document.docList);

  const pureUrl =
    url[url.length - 1] === "/" ? url.substr(0, url.length - 2) : url;

  const toMain = () => {
    history.push(`${pureUrl}`);
  };

  const toDocs = async () => {
    try {
      await dispatch(__getDocs(roomId));
    } catch (e) {
      console.log(e);
    } finally {
      if (docs.length) history.push(`${pureUrl}/doc/${docs[0].docId}`);
      else history.push(`${pureUrl}/doc/blank`);
    }
  };

  const toBoard = () => {
    history.push(`${pureUrl}/board`);
  };

  const toCalendar = () => {
    history.push(`${pureUrl}/timeline`);
  };

  const checkTab = (keyword) => {
    if (history.location.pathname.includes(keyword) === true) return true;
    else return false;
  };

  const checkMain = () => {
    if (!checkTab("doc") && !checkTab("board") && !checkTab("timeline"))
      return true;
    else return false;
  };

  return (
    <MobileNav>
      <NavBtn onClick={toMain} here={checkMain()}>
        <Icon icon="main" size="24px" />
        <NavText>메인</NavText>
      </NavBtn>
      <NavBtn onClick={toDocs} here={checkTab("doc")}>
        <Icon icon="document" size="24px" />
        <NavText>문서</NavText>
      </NavBtn>
      <NavBtn onClick={toBoard} here={checkTab("board")}>
        <Icon icon="board" size="24px" />
        <NavText>보드</NavText>
      </NavBtn>
      <NavBtn onClick={toCalendar} here={checkTab("timeline")}>
        <Icon icon="calendar" size="24px" />
        <NavText>타임라인</NavText>
      </NavBtn>
      <NavBtn>
        <Icon icon="chat" size="24px" />
        <NavText>채팅</NavText>
      </NavBtn>
    </MobileNav>
  );
};

const MobileNav = styled.nav`
  ${mobileOnly};
  z-index: var(--indexMobileNav);

  ${({ theme }) => theme.device.mobile} {
    ${flex("start", "start")};
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: var(--white);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

const NavText = styled(Text)`
  font-size: 1rem;
  line-height: 1.6rem;
  font-weight: 700;
`;

const NavBtn = styled.button`
  ${flex("center", "center", false)};
  width: calc(100% / 5);
  height: 100%;
  color: ${(props) => (props.here ? `var(--notice)` : `var(--black)`)};

  ${NavText} {
    color: ${(props) => (props.here ? `var(--notice)` : `var(--black)`)};
  }
`;

export default WSMobileNav;
