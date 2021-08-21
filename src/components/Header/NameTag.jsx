import React from "react";
import styled from "styled-components";

import { Text } from "../../elem";
import MyAvatar from "../../elem/MyAvatar";
import flex from "../../themes/flex";

const NameTag = ({ img, name }) => {
  // 한글 포함인지 확인
  const checkKorean = (str) => {
    const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (regExp.test(str)) {
      return true;
    }
    return false;
  };

  return (
    <Wrapper>
      <MyAvatar />
      <Nickname type={checkKorean(name) ? "button" : "gnb"}>{name}</Nickname>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flex("start")}
  flex-shrink: 0;
  gap: 10px;
  color: black;
`;

const Nickname = styled(Text)`
  flex-shrink: 0;
  &::first-letter {
    text-transform: uppercase;
  }
`;

export default NameTag;
