import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { head_2, head_6 } from "../../themes/textStyle";
import { useSelector } from "react-redux";

const FeatFourth = () => {
  const isMobile = useSelector((state) => state.resize.isMobile);

  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>바로 쓰세요, 바로 공유하세요</Title>
          <Sub>공유를 위해 파일을</Sub>
          <Sub>주고 받을 필요가 없어요</Sub>
        </Infos>
        <SubGround>
          <MainImage
            src={!isMobile ? "/img/_feat_4.svg" : "/img/_feat_m_4.svg"}
          />
        </SubGround>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 873px;

  ${({ theme }) => theme.device.mobile} {
    height: 700px;
  }
`;

const Wrapper = styled.div`
  ${flex("between", "center", false)}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 200px 80px 0 80px;

  ${({ theme }) => theme.device.mobile} {
    padding: 100px 20px 0 20px;
  }
`;

const Infos = styled.div``;

const SubGround = styled.div`
  width: 100%;
  height: 455px;
  background-color: #fff4d0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

const MainImage = styled.img`
  position: absolute;
  left: 50%;
  bottom: -230px;
  width: 70%;
  transform: translate(-50%);

  ${({ theme }) => theme.device.tablet} {
    width: 90%;
    bottom: -130px;
  }

  ${({ theme }) => theme.device.mobile} {
    width: 90%;
    bottom: -130px;
  }
`;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;
  text-align: center;

  ${({ theme }) => theme.device.mobile} {
    ${head_6};
    margin-bottom: 24px;
  }
`;

const Sub = styled.h2`
  ${head_6}
  margin-bottom: 10px;
  text-align: center;
  color: var(--darkgrey);

  ${({ theme }) => theme.device.mobile} {
    font-size: 1.6rem;
  }
`;

export default FeatFourth;
