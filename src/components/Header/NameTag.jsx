import React from "react";
import styled from "styled-components";

import { Text } from "../../elem";
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
      <ImgBox
        // 가짜 이미지
        src={
          "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9zZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
      />
      {/* <ImgBox src={img} /> */}
      <Nickname type={checkKorean(name) ? "button" : "gnb"}>{name}</Nickname>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flex("start")}
  gap: 4px;
  color: black;
`;

const ImgBox = styled.div`
  width: 24px;
  height: 24px;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  border-radius: 50%;
`;

const Nickname = styled(Text)`
  &::first-letter {
    text-transform: uppercase;
  }
`;

export default NameTag;
