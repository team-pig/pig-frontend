import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { __logout } from "../../redux/modules/user";

// component
import Icon from "../Icon";
import NameTag from "./NameTag";

// assets
import TextLogo from "../../assets/logo/textlogo.svg";
import MobileLogo from "../../assets/logo/logo.svg";

// mixin
import { mobileHidden, mobileOnly } from "../../themes/responsive";
import { button } from "../../themes/textStyle";
import flex from "../../themes/flex";

const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.user);

  return (
    <Container>
      <InsideBox>
        <LeftSide>
          <LogoBox
            onClick={
              isLogin
                ? () => history.push("/roomlist")
                : () => history.push("/")
            }
          >
            <img src={TextLogo} alt="협업돼지" />
          </LogoBox>
        </LeftSide>
        <MobileContainer>
          <LogoBox>
            <img src={MobileLogo} alt="협업돼지" />
          </LogoBox>
        </MobileContainer>
        <RightSide>
          {!isLogin ? (
            <Nav>
              <List>
                <Item>제품소개</Item>
                <Item onClick={() => history.push("/login")}>로그인</Item>
                <Item onClick={() => history.push("/register")}>회원가입</Item>
              </List>
            </Nav>
          ) : (
            <>
              <Btns>
                <IconBtn>
                  <Icon icon="notice-focus" size="28px" />
                </IconBtn>
                <NameBtn>
                  <NameTag name={user.nickname} />
                </NameBtn>
              </Btns>
              <Logout
                onClick={() => {
                  dispatch(__logout());
                }}
              >
                로그아웃
              </Logout>
            </>
          )}
        </RightSide>
        {/* 로그아웃 모달 필요  */}
        {/* 임시버튼 */}
      </InsideBox>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--indexHeader);
  width: 100%;
  height: 72px;
  background-color: var(--white);
  border: 1px solid var(--line);

  ${({ theme }) => theme.device.mobile} {
    height: 50px;
  }
`;

const InsideBox = styled.div`
  ${flex("between")}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0 80px;
`;

const LeftSide = styled.section`
  ${mobileHidden};
  flex-shrink: 0;
`;

const RightSide = styled.section`
  ${mobileHidden};
  margin-right: -16px;
`;

const MobileContainer = styled.div`
  ${mobileOnly};
  width: 100%;
`;

const LogoBox = styled.div`
  ${flex()}
  cursor: pointer;
`;

const Nav = styled.nav``;

const List = styled.ul`
  ${flex("start")}
`;

const Item = styled.li`
  ${button};
  margin: 0;
  padding: 4px 16px;
  color: var(--main);
  cursor: pointer;
`;

const Btns = styled.div`
  ${flex("center", "center")}
  margin-right: -24px;
`;

const IconBtn = styled.button`
  padding: 7px 14px;
`;

const NameBtn = styled.button`
  padding: 12px 24px;
`;

// 임시버튼
const Logout = styled.button`
  ${button}
  position: absolute;
  bottom: 15px;
  right: 250px;
  padding: 8px 16px;
  color: white;
  background-color: var(--notice);
`;

export default Header;
