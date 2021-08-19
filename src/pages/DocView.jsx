import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component
import DocList from "../feature/document/DocList";
import DocViewer from "../feature/document/DocViewer";
import ResizeWidth from "../components/ResizeWidth";

// redux & api
import { __getDocs } from "../redux/modules/document";
import { resizeDocList } from "../redux/modules/resize";

const DocView = (props) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const docList = useSelector((state) => state.document.docList) || [];
  const docListWidth = useSelector((state) => state.resize.docListWidth);

  useEffect(() => {
    dispatch(__getDocs(roomId));
  }, [dispatch, roomId]);

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
      {
        <ResizeWidth
          size={size}
          handleSize={handleSize}
          drag="right"
          option={option}
          storeSaveFunc={resizeDocList}
        >
          <DocList docList={docList} />
        </ResizeWidth>
      }
      <DocViewer left={size.width} />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  width: 100%;
`;

export default DocView;
