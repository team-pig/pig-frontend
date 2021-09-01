import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

// elem
import { Text } from "../elem";

// api
import { __getDocs } from "../redux/modules/document";
import { body_2 } from "../themes/textStyle";

const WSTabs = ({ url }) => {
  const history = useHistory();

  const pureUrl =
    url[url.length - 1] === "/" ? url.substr(0, url.length - 2) : url;

  const { roomId } = useParams();

  const docs = useSelector((state) => state.document.docList);

  const dispatch = useDispatch();

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
    <List>
      <Item onClick={toMain}>
        <MenuText type="body_1" here={checkMain()}>
          메인
        </MenuText>
      </Item>
      <Item onClick={toDocs}>
        <MenuText type="body_1" here={checkTab("doc")}>
          문서
        </MenuText>
      </Item>
      <Item onClick={toBoard}>
        <MenuText type="body_1" here={checkTab("board")}>
          보드
        </MenuText>
      </Item>
      <Item onClick={toCalendar}>
        <MenuText type="body_1" here={checkTab("timeline")}>
          일정
        </MenuText>
      </Item>
    </List>
  );
};

const List = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
`;

const MenuText = styled(Text)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  width: auto;
  height: 100%;
  color: ${(props) => (props.here ? "var(--main);" : "var(--darkgrey);")};

  &::after {
    position: absolute;
    left: 0;
    bottom: 0.5px;
    content: "";
    height: 2px;
    width: 100%;
    border-radius: 4px;
    background-color: ${(props) =>
      props.here ? "var(--main)" : "transparent"};
    transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
  }

  &:hover {
    color: var(--main);
  }

  ${({ theme }) => theme.device.mobile} {
    /* display: inline-block; */
    ${body_2}
    vertical-align: middle;
  }
`;

const Item = styled.button`
  flex-shrink: 0;
  height: 100%;
  padding: 0 39px;
  color: var(--darkgrey);
  cursor: pointer;

  ${({ theme }) => theme.device.mobile} {
    width: 25%;
    padding: 0;
    /* flex-grow: 1; */
  }

  &:hover {
    ${MenuText} {
      &::after {
        background-color: var(--main);
      }
    }
  }
`;

export default WSTabs;
