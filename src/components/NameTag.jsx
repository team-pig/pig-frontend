import React from "react";
import styled from "styled-components";

import { Text } from "../elem";

const NameTag = ({ img, name }) => {
  return (
    <Wrapper>
      <ImgBox
        // 가짜 이미지
        src={
          "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9zZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
      />
      {/* <ImgBox src={img} /> */}
      <Text type="gnb">{name}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: black;
`;

const ImgBox = styled.div`
  width: 24px;
  height: 24px;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  border-radius: 50%;
`;

export default NameTag;
