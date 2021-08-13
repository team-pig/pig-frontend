import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

// elem
import { Text } from "../elem";

// api
import { __getDocs } from "../redux/modules/document";

const WSTabs = ({ url }) => {
  const history = useHistory();

  const { roomId } = useParams();

  const docs = useSelector((state) => state.document.docList);

  const dispatch = useDispatch();

  const toMain = () => {
    history.push(`${url}`);
  };

  const toDocs = async () => {
    try {
      await dispatch(__getDocs(roomId));
    } catch (e) {
      console.log(e);
    } finally {
      if (docs.length) history.push(`${url}/doc/${docs[0].docId}`);
      else history.push(`${url}/doc/blank`);
    }
  };

  const toBoard = () => {
    history.push(`${url}/board`);
  };

  const toCalendar = () => {
    history.push(`${url}/timeline`);
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
          타임라인
        </MenuText>
      </Item>
    </List>
  );
};

// 가짜 스타일
const List = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
`;

const Item = styled.button`
  flex-shrink: 0;
  height: 100%;
  padding: 0 39px;
  color: var(--darkgrey);
  cursor: pointer;
`;

const MenuText = styled(Text)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
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

    &::after {
      background-color: var(--main);
    }
  }
`;

export default WSTabs;
