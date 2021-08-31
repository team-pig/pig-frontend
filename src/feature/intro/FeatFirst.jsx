import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { head_2, head_6 } from "../../themes/textStyle";
import { useSelector } from "react-redux";

const FeatFirst = () => {
  const isMobile = useSelector((state) => state.resize.isMobile);

  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>프로젝트별로 방을 만들어요</Title>
          <Sub>초대코드를 이용해서 팀원을 초대하세요!</Sub>
          <Sub>단 하나의 방에서 프로젝트의 </Sub>
          <Sub>모든 것을 공유할 수 있어요.</Sub>
          <Image src={!isMobile ? `/img/_feat_1.svg` : "/img/_feat_m_1.svg"} />
        </Infos>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 873px;
  background-color: #f9f9f9;

  ${({ theme }) => theme.device.tablet} {
    height: 600px;
  }

  ${({ theme }) => theme.device.mobile} {
    height: 800px;
  }
`;

const Wrapper = styled.div`
  ${flex("start", "start")}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 100px 80px 80px 80px;
  overflow: hidden;

  ${({ theme }) => theme.device.mobile} {
    padding: 40px 20px 0px 20px;
  }
`;

const Infos = styled.div``;

const Image = styled.img`
  margin-top: 40px;
  width: 90%;

  ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;

  ${({ theme }) => theme.device.mobile} {
    ${head_6};
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

export default FeatFirst;
