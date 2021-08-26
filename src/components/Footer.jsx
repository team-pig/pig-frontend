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
            console.log("8.26.15:18 하.. 버그가 넘 많다 ㅎ..");
          }}
        >
          ver 1.0.0
        </Info>
      </FooInfos>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  height: 241px;
  background-color: var(--main);
  padding: 57px 87px 39px 87px;
`;

const Header = styled.div`
  ${flex("start")}
`;

const Info = styled.div`
  ${body_3}
  color: var(--white);
  margin-top: 96px;
  margin-bottom: 39px;
  text-align: center;
  width: 200px;
`;

const FooInfos = styled.div`
  ${flex("between")}
`;

const Logo = styled.img``;
export default Footer;
