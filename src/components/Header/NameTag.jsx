import React from "react";
import styled from "styled-components";

import { Text } from "../../elem";
import flex from "../../themes/flex";

const NameTag = ({ img, name }) => {
  const avatar = localStorage.getItem("avatar");
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
      <ImgBox src={avatar} />
      <Nickname type={checkKorean(name) ? "button" : "gnb"}>{name}</Nickname>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flex("start")}
  flex-shrink: 0;
  gap: 4px;
  color: black;
`;

const ImgBox = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  border-radius: 50%;
`;

const Nickname = styled(Text)`
  flex-shrink: 0;
  &::first-letter {
    text-transform: uppercase;
  }
`;

export default NameTag;
