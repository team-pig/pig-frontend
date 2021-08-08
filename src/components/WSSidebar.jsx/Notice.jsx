import React from "react";
import styled from "styled-components";

import Icon from "../Icon";
import { IconBtn, Text } from "../../elem";
import flex from "../../themes/flex";

const Notice = () => {
  return (
    <NotiContainer>
      <IconBox>
        <Icon icon="bookmark" size="20px" color="var(--main)" />
      </IconBox>
      <NotiText type="body_3">8월 14일 발표까지 MVP 전부 만들기!!!!!!</NotiText>
      <IconBtn>
        <Icon icon="arrow-down" size="14px" color="var(--darkgrey)" />
      </IconBtn>
    </NotiContainer>
  );
};

const NotiContainer = styled.article`
  ${flex()};
  width: 100%;
  height: 48px;
  padding: 0 10px 0 20px;
  background-color: var(--line);
  overflow-x: hidden;
  overflow-y: hidden;
`;

const NotiText = styled(Text)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconBox = styled.div`
  ${flex()};
  flex-shrink: 0;
  margin-right: 4px;
`;

export default Notice;
