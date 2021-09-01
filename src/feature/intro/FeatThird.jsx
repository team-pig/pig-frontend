import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { head_2, head_6 } from "../../themes/textStyle";

const FeatThird = () => {
  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>별도의 메신저 필요없이</Title>
          <Sub>방마다 제공되는 채팅으로 소통을 편리하게</Sub>
        </Infos>
        <MainImage src="/img/_feat_3.svg" />
        <SubImage src="/img/_feat_3_2.svg" />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 873px;
  background-color: #f9f9f9;

  ${({ theme }) => theme.device.tablet} {
    height: 700px;
  }

  ${({ theme }) => theme.device.mobile} {
    height: 500px;
  }
`;

const Wrapper = styled.div`
  ${flex("center", "start")};
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 80px;
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.device.mobile} {
    padding: 80px 20px;
  }
`;

const Infos = styled.div``;

const MainImage = styled.img`
  position: absolute;
  width: 30%;
  left: 100px;
  bottom: -300px;

  ${({ theme }) => theme.device.tablet} {
    width: 40%;
    bottom: -100px;
  }

  ${({ theme }) => theme.device.mobile} {
    width: 60%;
    left: 50%;
    transform: translate(-50%);
    bottom: -200px;
  }
`;

const SubImage = styled.img`
  position: absolute;
  right: 70px;
  bottom: -100px;

  ${({ theme }) => theme.device.mobile} {
    display: none;
    width: 90%;
    bottom: -200px;
    right: 40px;
  }
`;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;
  text-align: center;

  ${({ theme }) => theme.device.mobile} {
    ${head_6}
    margin-bottom: 30px;
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

export default FeatThird;
