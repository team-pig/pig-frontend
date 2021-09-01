import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { __logout } from "../../redux/modules/user";

// component
import NameTag from "./NameTag";

// assets
import TextLogo from "../../assets/logo/textlogo.svg";
import MobileLogo from "../../assets/logo/logo.svg";

// mixin
import { mobileHidden, mobileOnly } from "../../themes/responsive";
import { button } from "../../themes/textStyle";
import flex from "../../themes/flex";
import { resetReducer } from "../../redux/configStore";
import isLogin from "../../auth/isLogin";
import Icon from "../Icon";
import MyAvatar from "../../elem/MyAvatar";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { user, isLogin: login } = useSelector((state) => state.user);

  const logged = isLogin(); // 로그인 여부 체크
  const clickLogout = () => {
    dispatch(__logout());
    dispatch(resetReducer());
  };

  const clickLogo = useCallback(() => {
    if (login) history.push("/roomlist");
    else history.push("/");
  }, [login, history]);

  const clickMypage = useCallback(() => {
    if (login) history.push("/mypage");
    else history.push("/login");
  }, [login, history]);

  return (
    <Container pathname={pathname}>
      <InsideBox>
        <LeftSide>
          <LogoBox onClick={() => history.push("/")}>
            <img src={TextLogo} alt="협업돼지" />
          </LogoBox>
        </LeftSide>
        <MobileContainer>
          <LogoBox onClick={clickLogo}>
            <Logo src={MobileLogo} alt="협업돼지" />
          </LogoBox>
          <IconBtn onClick={clickMypage} login={login}>
            {!login && <Icon icon="my" size="24px" color="black" />}
            {login && <MyAvatar />}
          </IconBtn>
        </MobileContainer>
        <RightSide>
          {!logged ? (
            <Nav>
              <List>
                <Item onClick={() => history.push("/login")}>로그인</Item>
                <Item onClick={() => history.push("/register")}>회원가입</Item>
              </List>
            </Nav>
          ) : (
            <>
              <Btns>
                <NameBtn onClick={() => history.push("/mypage")}>
                  <NameTag name={user.nickname} />
                </NameBtn>
                <LogoutBtn onClick={clickLogout}>로그아웃</LogoutBtn>
              </Btns>
            </>
          )}
        </RightSide>
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
  border-bottom: 1px solid var(--line);
  ${(props) => props.pathname.includes("chat") && `display: none`};

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

  ${({ theme }) => theme.device.mobile} {
    padding: 20px;
  }
`;

const LeftSide = styled.section`
  ${mobileHidden};
  flex-shrink: 0;
`;

const RightSide = styled.section`
  ${flex("start", "center")};
  ${mobileHidden};
  height: 100%;
  margin-right: -16px;
`;

const MobileContainer = styled.div`
  ${mobileOnly};
  position: relative;
  width: 100%;
`;

const LogoBox = styled.div`
  ${flex()}
  cursor: pointer;
`;

const Logo = styled.img`
  height: 30px;
`;

const Nav = styled.nav`
  height: 100%;
`;

const List = styled.ul`
  ${flex("start")}
  height: 100%;
`;

const Item = styled.button`
  ${button};
  height: 100%;
  margin: 0;
  padding: 4px 16px;
  color: var(--main);
  cursor: pointer;
`;

const LogoutBtn = styled(Item)`
  color: var(--black);
`;

const Btns = styled.div`
  ${flex("center", "center")}
  height: 100%;
  margin-right: -24px;
`;

const IconBtn = styled.button`
  ${flex()};
  position: absolute;
  top: 50%;
  right: 0;
  height: 100%;
  padding: 7px 10px;
  margin-right: -10px;
  transform: translateY(-50%);

  ${(props) => (props.login ? `margin-bottom: 1px;` : `margin-top: 1px;`)};
`;

const NameBtn = styled.button`
  height: 100%;
  padding: 12px 24px;
`;

export default Header;
