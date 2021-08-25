import React from "react";
import Template from "../components/Template";
import SEO from "../components/SEO";
import styled from "styled-components";
import { head_2, head_6 } from "../themes/textStyle";
import { useHistory } from "react-router-dom";

// elem & compo
import flex from "../themes/flex";
import FeatFirst from "../feature/intro/FeatFirst";
import FeatSecond from "../feature/intro/FeatSecond";
import FeatThird from "../feature/intro/FeatThird";
import FeatFourth from "../feature/intro/FeatFourth";
import FeatFifth from "../feature/intro/FeatFifth";
import Profiles from "../feature/intro/Profiles";
import Footer from "../components/Footer";

const Intro = () => {
  const history = useHistory();
  return (
    <>
      <SEO title="홈" />
      <Template>
        <Container>
          <Headline>
            <Title>쉽고, 빠르고, 가벼운, 협업 솔루션</Title>
            <SubTitle>진정한 협업이 궁금하다면</SubTitle>
            <Button
              onClick={() => {
                history.push("/login");
              }}
            >
              협업돼지 시작하기
            </Button>
            <Gradation>
              <HeadLineImg src="/img/head.svg" />
            </Gradation>
          </Headline>
          <Profiles />
          <FeatFirst />
          <FeatSecond />
          <FeatThird />
          <FeatFourth />
          <FeatFifth />
        </Container>
        <Footer />
      </Template>
    </>
  );
};

const Container = styled.section`
  margin: 0 auto;
`;

// Head
const Headline = styled.article`
  ${flex("center", "cetner", false)}
  margin: 106px 0;
`;

const Button = styled.button`
  width: 380px;
  height: 50px;
  border: 1px solid var(--main);
  color: var(--main);
  transition: 250ms background-color ease-in-out;
  &:hover {
    background-color: var(--main);
    color: var(--white);
  }
`;

const Gradation = styled.div`
  width: 100%;
  height: 700px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 218, 218, 0.4) 100%,
    rgba(255, 204, 204, 1) 100%
  );
  position: relative;
  overflow: hidden;
`;

const HeadLineImg = styled.img`
  position: absolute;
  bottom: -140px;
  left: 50%;
  transform: translate(-50%);
`;

// local elem
const Title = styled.h1`
  ${head_2}
  margin-bottom: 30px;
`;

const SubTitle = styled.h2`
  ${head_6}
  margin-bottom: 58px;
  color: var(--darkgrey);
`;

export default Intro;
