import React from "react";
import styled, { css } from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { resetReducer } from "../../redux/configStore";
import { __logout } from "../../redux/modules/user";

import NameTag from "../Header/NameTag";
import WSTabs from "../WSTabs";
import Icon from "../Icon";
import { mobileHidden, desktopOnly } from "../../themes/responsive";
import flex from "../../themes/flex";
import { Text } from "../../elem";

const WSHeader = ({ url }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const room = useSelector((state) => state.room.roomInfos);

  const clickLogout = () => {
    dispatch(__logout());
    dispatch(resetReducer());
  };

  return (
    <Container pathname={pathname}>
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
        <HeaderBtn onClick={clickLogout} desktop>
          {/* 태블릿 버전에서 로그아웃은 아이콘으로 대체되어야 함 */}
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
  ${(props) => props.pathname.includes("chat") && `display: none;`}

  ${({ theme }) => theme.device.tablet} {
    padding: 0 20px;
  }

  ${({ theme }) => theme.device.mobile} {
    padding: 0;
  }
`;

const LeftSide = styled.div`
  ${flex("start", "center")}

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const RightSide = styled.div`
  ${mobileHidden};
  ${flex("start", "center")}
  height: 100%;
`;

const TitleBox = styled.div`
  ${mobileHidden};
  width: 260px;
  color: var(--main);
  white-space: nowrap;
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

  ${(props) => {
    if (props.desktop) {
      return css`
        ${desktopOnly}
      `;
    }
  }}
`;

const NameBtn = styled.button`
  padding: 0 18px;
`;

export default WSHeader;
