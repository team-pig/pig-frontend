import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NameTag from "../Header/NameTag";
import Icon from "../Icon";
import WSTabs from "../WSTabs";
import { Text } from "../../elem";
import flex from "../../themes/flex";
import { __logout } from "../../redux/modules/user";
import { resetReducer } from "../../redux/configStore";

const WSHeader = ({ url }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const room = useSelector((state) => state.room.roomInfos);

  const clickLogout = () => {
    dispatch(__logout());
    dispatch(resetReducer());
  };

  return (
    <Container>
      <LeftSide>
        <TitleBox>
          <Text type="sub_1">{room && room.roomName}</Text>
        </TitleBox>
        <WSTabs url={url} />
      </LeftSide>
      <RightSide>
        <Icons>
          <HeaderBtn onClick={() => history.push("/roomlist")}>
            <Icon icon="home" size="28px" />
          </HeaderBtn>
          {/* <HeaderBtn>
            <Icon icon="notice-focus" size="28px" />
          </HeaderBtn> */}
        </Icons>
        <NameBtn onClick={() => history.push("/mypage")}>
          <NameTag name={user.nickname} />
        </NameBtn>
        <HeaderBtn onClick={clickLogout}>
          <Text type="button" color="var(--black)">
            로그아웃
          </Text>
        </HeaderBtn>
      </RightSide>
    </Container>
  );
};

const Container = styled.header`
  ${flex("between")}
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--indexHeader);
  width: 100%;
  height: 48px;
  padding: 0 40px;
  background-color: var(--white);
  border-bottom: 1px solid var(--line);
`;

const LeftSide = styled.div`
  ${flex("start", "center")}
`;

const RightSide = styled.div`
  ${flex("start", "center")}
  height: 100%;
`;

const TitleBox = styled.div`
  width: 260px;
  color: var(--main);
`;

const Icons = styled.div`
  display: flex;
  height: 100%;
`;

const HeaderBtn = styled.button`
  ${flex()};
  flex-shrink: 0;
  height: 100%;
  padding: 0 14px;
  cursor: pointer;
`;

const NameBtn = styled.button`
  padding: 0 18px;
`;

export default WSHeader;
