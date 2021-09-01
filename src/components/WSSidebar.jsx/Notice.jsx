import React from "react";
import styled from "styled-components";

import Icon from "../Icon";
import { IconBtn, Text } from "../../elem";
import flex from "../../themes/flex";

const Notice = ({ _onClick }) => {
  return (
    <NotiContainer>
      <IconBox onClick={_onClick}>
        <CloseIcon icon="arrow-down" size="20px" color="var(--main)" />
      </IconBox>
      <NotiText type="body_3">8월 14일 발표까지 MVP 전부 만들기!!!!!!</NotiText>
      <IconBtn style={{ visibility: "hidden" }}>
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
  visibility: hidden;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconBox = styled.div`
  ${flex()};
  flex-shrink: 0;
  margin-right: 4px;
  cursor: pointer;
`;

const CloseIcon = styled(Icon)`
  transform: rotate(-90deg);
`;

export default Notice;
