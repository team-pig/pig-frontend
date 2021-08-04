import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../Icon";
import { __loginCheck, __logout } from "../../redux/modules/user";
import { button } from "../../themes/textStyle";
import NameTag from "./NameTag";

const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  // useEffect(() => {
  //   dispatch(__loginCheck());
  // }, []);

  console.log(isLogin);

  return (
    <Container>
      <InsideBox>
        <LeftSide>
          <LogoBox onClick={() => history.push("/")}>
            <TextLogo>협업돼지</TextLogo>
          </LogoBox>
        </LeftSide>
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
            <Btns>
              <IconBtn>
                <Icon icon="notice-focus" size="28px" />
              </IconBtn>
              <NameBtn>
                <NameTag name={"Anna"} />
              </NameBtn>
            </Btns>
          )}
        </RightSide>
        {/* 로그아웃 모달 필요  */}
        {/* <Button
          _onClick={() => {
            dispatch(__logout());
          }}
        >
          {isLogin ? "로그아웃" : "로그인"}
        </Button> */}
      </InsideBox>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: var(--white);
  border: 1px solid var(--line);
`;

const InsideBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0 80px;
`;

const LeftSide = styled.section`
  flex-shrink: 0;
`;

const RightSide = styled.section`
  margin-right: -16px;
`;

const LogoBox = styled.div`
  cursor: pointer;
`;

const TextLogo = styled.p`
  color: var(--main);
  font-size: 4rem;
  line-height: 6rem;
  letter-spacing: -0.7rem;
  font-weight: lighter;
`;

const Nav = styled.nav``;

const List = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  ${button};
  margin: 0;
  padding: 4px 16px;
  color: var(--main);
  cursor: pointer;
`;

const Btns = styled.button`
  display: flex;
  align-items: center;
  margin-right: -24px;
`;

const IconBtn = styled.button`
  padding: 7px 14px;
`;

const NameBtn = styled.button`
  padding: 12px 24px;
`;

export default Header;
