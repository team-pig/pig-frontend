import React from "react";
import styled from "styled-components";
import flex from "../themes/flex";
import { body_3 } from "../themes/textStyle";
import logo from "../assets/logo/logo_white.svg";

const Footer = () => {
  return (
    <Container>
      <Header>
        <Logo src={logo} />
      </Header>
      <FooInfos>
        <Info></Info>
        <Info>&copy; 2021 Teampig</Info>
        <Info
          onClick={() => {
            console.log("최종 배포만 남았다..!");
          }}
        >
          ver 1.0.0
        </Info>
      </FooInfos>
    </Container>
  );
};

const Container = styled.footer`
  ${flex("between", "start", false)}
  width: 100%;
  height: 240px;
  background-color: var(--main);
  padding: 20px;
`;

const Header = styled.div`
  ${flex("start")}
`;

const Info = styled.div`
  ${body_3}
  color: var(--white);
  text-align: center;
  width: 33.333%;

  ${({ theme }) => theme.device.mobile} {
    margin: 0;
    width: 100%;
  }
`;

const FooInfos = styled.div`
  width: 100%;
  ${flex("between", "center")}
`;

const Logo = styled.img``;
export default Footer;
