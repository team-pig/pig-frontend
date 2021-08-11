import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// component
import DocList from "../feature/document/DocList";
import BlankImg from "../assets/img/doc-blank-img.jpg";

// elem
import { Button } from "../elem";

import flex from "../themes/flex";

const DocBlank = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const docList = useSelector((state) => state.document.docList) || [];

  if (docList.length > 0) {
    history.replace(
      `/workspace/${roomId}/doc/${docList[docList.length - 1].docId}`
    );
  }

  return (
    <Container>
      <DocList docList={[]} />
      <Content>
        <ImgBox>
          <BlankImgBox src={BlankImg} />
        </ImgBox>
      </Content>
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  --header: 48px;
  --padding: 40px;
  --minusHeight: calc(var(--header) + var(--padding) + 20px);

  ${flex("start", "start")};
  gap: 20px;
  flex-grow: 1;
  min-height: calc(100vh - var(--minusHeight));
`;

const Content = styled.section`
  --header: 48px;
  --minusHeight: calc(var(--header));
  ${flex};
  flex-grow: 1;
  height: 100%;
  font-size: 2rem;
  min-height: calc(100vh - var(--minusHeight));
`;

const ImgBox = styled.div`
  width: 70%;
  max-width: 590px;
  min-width: 300px;
`;

const BlankImgBox = styled.div`
  width: 100%;
  padding-top: calc(100% * (392 / 590));
  margin-bottom: 20px;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
`;
export default DocBlank;
