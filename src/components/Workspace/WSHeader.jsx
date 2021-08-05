import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import NameTag from "../Header/NameTag";
import Icon from "../Icon";
import WSTabs from "../WSTabs";
import { Text } from "../../elem";

const WSHeader = ({ url }) => {
  const history = useHistory();

  return (
    <Container>
      <LeftSide>
        <TitleBox>
          <Text type="sub_1">사이드 프로젝트</Text>
        </TitleBox>
        <WSTabs url={url} />
      </LeftSide>
      <RightSide>
        <Icons>
          <HeaderBtn onClick={() => history.push("/roomlist")}>
            <Icon icon="home" size="28px" />
          </HeaderBtn>
          <HeaderBtn>
            <Icon icon="notice-focus" size="28px" />
          </HeaderBtn>
        </Icons>
        <HeaderBtn>
          <NameTag name="Anna" />
        </HeaderBtn>
      </RightSide>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 40px;
  border-bottom: 1px solid var(--line);
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const TitleBox = styled.div`
  width: 260px;
  color: var(--main);
`;

const Icons = styled.div`
  display: flex;
  gap: 28px;
  margin-right: 38px;
`;

const HeaderBtn = styled.button`
  cursor: pointer;
`;

export default WSHeader;
