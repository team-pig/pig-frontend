import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// component
import DocList from "../feature/document/DocList";
import BlankImg from "../assets/img/doc-blank-img.jpg";
import ResizeWidth from "../components/ResizeWidth";
import flex from "../themes/flex";

// redux & api
import { resizeDocList } from "../redux/modules/resize";

const DocBlank = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const docList = useSelector((state) => state.document.docList) || [];
  const docListWidth = useSelector((state) => state.resize.docListWidth);

  if (docList.length > 0) {
    history.replace(
      `/workspace/${roomId}/doc/${docList[docList.length - 1].docId}`
    );
  }

  // 아래 내용들은 모두 ResizeWidth 관련
  const [size, setSize] = useState({
    width: docListWidth,
    height: "calc(100vh - 48px + 20px)",
  });

  const option = {
    minWidth: "260px",
    maxWidth: "500px",
  };

  const handleSize = useCallback(
    (width) => setSize((pre) => ({ ...pre, width })),
    []
  );

  return (
    <Container>
      <ResizeWidth
        size={size}
        handleSize={handleSize}
        drag="right"
        option={option}
        storeSaveFunc={resizeDocList}
      >
        <DocList docList={docList} />
      </ResizeWidth>

      <Content left={size.width}>
        <ImgBox>
          <BlankImgBox src={BlankImg} />
        </ImgBox>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  --header: 48px;
  --padding: 40px;
  --minusHeight: calc(var(--header) + var(--padding) + 20px);

  ${flex("start", "start")};
  gap: 20px;
  width: 100%;
  min-height: calc(100vh - var(--minusHeight));
`;

const Content = styled.section`
  --header: 48px;
  --minusHeight: calc(var(--header));

  ${flex};
  position: relative;
  top: 0;
  left: ${(props) => `${props.left}px;`};
  width: ${(props) => `calc(100% - ${props.left}px)`};
  height: 100%;
  font-size: 2rem;
  min-height: calc(100vh - var(--minusHeight));
  overflow: hidden;
`;

const ImgBox = styled.div`
  width: 70vmin;
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
