import React from "react";
import styled from "styled-components";
import flex from "../themes/flex";
import { body_3 } from "../themes/textStyle";
import logo from "../assets/logo/logo_white.svg";

const Footer = () => {
  return (
    <Container>
      <Header>
        <Logo src={logo}></Logo>
      </Header>
      <Copyright>&copy; 2020-2021 Teampig</Copyright>
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

const Copyright = styled.div`
  ${body_3}
  color: var(--white);
  margin-top: 96px;
  margin-bottom: 39px;
  text-align: center;
`;

const Logo = styled.img``;
export default Footer;
