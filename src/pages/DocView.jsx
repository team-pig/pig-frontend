import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rnd } from "react-rnd";

// component
import DocList from "../feature/document/DocList";
import DocViewer from "../feature/document/DocViewer";

// redux & api
import { __getDocs } from "../redux/modules/document";
import { resizeDocList } from "../redux/modules/resize";

const DocView = (props) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const docList = useSelector((state) => state.document.docList) || [];
  const docListWidth = useSelector((state) => state.resize.docListWidth);

  const [size, setSize] = useState({
    width: docListWidth,
    height: "calc(100vh - 48px + 20px)",
  });

  useEffect(() => {
    dispatch(__getDocs(roomId));
  }, [dispatch, roomId]);

  const onResize = (event, dir, refToElement, delta, position) => {
    setSize((pre) => ({
      ...pre,
      width: refToElement.style.width.split("px")[0],
    }));
  };

  const onResizeStop = (event) => {
    dispatch(resizeDocList(size.width));
  };

  return (
    <Container>
      {size.width && (
        <Rnd
          default={{
            x: 0,
            y: 0,
            width: size.width,
          }}
          minWidth="260px"
          maxWidth="500px"
          minHeight="100vh"
          maxHeight="100vh"
          resizeGrid={[1, 1]}
          disableDragging={true}
          bounds="window"
          enableResizing={{ top: false, bottom: false, right: true }}
          onResize={onResize}
          onResizeStop={onResizeStop}
        >
          <DocList docList={docList} />
        </Rnd>
      )}
      <DocViewer left={size.width} />
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  display: flex;
  width: 100%;
`;

export default DocView;
