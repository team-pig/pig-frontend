import React from "react";
import styled from "styled-components";
import { Button } from "../elem";
import { __logout } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin);
  return (
    <Container>
      <Button
        _onClick={() => {
          dispatch(__logout());
        }}
      >
        {isLogin ? "로그아웃" : "로그인"}
      </Button>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: #eee;
`;
export default Header;
