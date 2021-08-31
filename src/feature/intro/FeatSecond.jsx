import React from "react";
import styled from "styled-components";
import { head_2, head_6 } from "../../themes/textStyle";
import flex from "../../themes/flex";
import { useSelector } from "react-redux";

const FeatSecond = () => {
  const isMobile = useSelector((state) => state.resize.isMobile);

  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>할 일과 일정관리를 한번에</Title>
          <Sub>팀 전체의 할 일 부터</Sub>
          <Sub>나만의 To-do 정리까지 하나로 연동</Sub>
        </Infos>
        <MainImage
          src={!isMobile ? "/img/_feat_2.svg" : "/img/_feat_m_2.svg"}
        />
        <SubImgage src="/img/feat_m_2_2.svg" />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 1800px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(227, 236, 255, 1) 89%,
    rgba(217, 230, 255, 1) 100%,
    rgba(255, 204, 204, 1) 100%
  );

  ${({ theme }) => theme.device.tablet} {
    height: 800px;
  }

  ${({ theme }) => theme.device.mobile} {
    height: 500px;
  }
`;

const Wrapper = styled.div`
  ${flex("end", "start")}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 200px 80px;
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.device.mobile} {
    ${flex("start", "start")}
    padding: 80px 20px;
  }
`;

const Infos = styled.div`
  z-index: 1;
`;

const MainImage = styled.img`
  position: absolute;
  width: 90%;
  left: 80px;

  ${({ theme }) => theme.device.tablet} {
    width: 80%;
    bottom: -100px;
  }

  ${({ theme }) => theme.device.mobile} {
    width: 90%;
    bottom: -300px;
    left: 50%;
    transform: translate(-50%);
  }
`;

const SubImgage = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: -300px;
  ${({ theme }) => theme.device.tablet} {
    display: none;
  }

  ${({ theme }) => theme.device.mobile} {
    width: 90%;
    bottom: -300px;
    left: 50%;
    transform: translate(-50%);
  }
`;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;

  ${({ theme }) => theme.device.mobile} {
    ${head_6}
  }
`;

const Sub = styled.h2`
  ${head_6}
  margin-bottom: 10px;
  color: var(--darkgrey);

  ${({ theme }) => theme.device.mobile} {
    font-size: 1.6rem;
  }
`;

export default FeatSecond;
