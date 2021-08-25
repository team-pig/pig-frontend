import React from "react";
import styled from "styled-components";
import { head_2, head_6 } from "../../themes/textStyle";
import flex from "../../themes/flex";

const FeatSecond = () => {
  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>할 일과 일정관리를 한번에</Title>
          <Sub>팀 전체의 할 일 부터</Sub>
          <Sub>나만의 To-do 정리까지 하나로 연동</Sub>
        </Infos>
        <MainImage src="/img/feat_2.svg" />
        <SubImgage src="/img/feat_2_2.svg" />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 1746px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(227, 236, 255, 1) 89%,
    rgba(217, 230, 255, 1) 100%,
    rgba(255, 204, 204, 1) 100%
  );
`;

const Wrapper = styled.div`
  ${flex("end", "start")}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 200px 80px;
  position: relative;
  overflow: hidden;
`;

const Infos = styled.div`
  z-index: 1;
`;

const MainImage = styled.img`
  position: absolute;
  left: 100px;
`;

const SubImgage = styled.img`
  position: absolute;
  left: 100px;
  bottom: -40px;
`;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;
`;

const Sub = styled.h2`
  ${head_6}
  margin-bottom: 10px;
  color: var(--darkgrey);
`;

export default FeatSecond;
