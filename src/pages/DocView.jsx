import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component
import DocList from "../feature/document/DocList";
import DocViewer from "../feature/document/DocViewer";
import ResizeWidth from "../components/ResizeWidth";
import MobileDocHeader from "../feature/document/MobileDocHeader";

// theme & function
import flex from "../themes/flex";
import { mobileHidden, mobileOnly } from "../themes/responsive";

// redux & api
import { __getDocs, __getDoc, resetDoc } from "../redux/modules/document";
import { resizeDocList } from "../redux/modules/resize";

const DocView = (props) => {
  const { roomId, docId } = useParams();
  const dispatch = useDispatch();

  const docList = useSelector((state) => state.document.docList) || [];
  const { isMobile, docListWidth } = useSelector((state) => state.resize);

  const [isOpenMobileList, setIsOpenMobileList] = useState(false);

  useEffect(() => {
    dispatch(__getDocs(roomId, docId));
    dispatch(__getDoc(roomId, docId));
    return () => {
      dispatch(resetDoc());
    };
  }, [dispatch, roomId, docId]);

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

  // 모바일 리스트가 있는 경우 뒤 스크롤이 움직이지 않도록 고정
  useEffect(() => {
    if (isMobile && isOpenMobileList) {
      document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = `position: ""; top: "";`;
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isMobile, isOpenMobileList]);

  const clickShowList = () => setIsOpenMobileList((pre) => !pre);

  return (
    <Container>
      <Top>
        <MobileDocHeader clickShowList={clickShowList} />
      </Top>
      <Bottom>
        <ListContainer>
          <ResizeWidth
            size={size}
            handleSize={handleSize}
            drag="right"
            option={option}
            storeSaveFunc={resizeDocList}
          >
            <DocList docList={docList} />
          </ResizeWidth>
        </ListContainer>
        <DocViewer left={size.width} />
      </Bottom>
      {isMobile && (
        <>
          <MobileListContainer isOpenMobileList={isOpenMobileList}>
            <DocList docList={docList} />
          </MobileListContainer>
          <Overlay
            isOpenMobileList={isOpenMobileList}
            onClick={clickShowList}
          ></Overlay>
        </>
      )}
    </Container>
  );
};

const Container = styled.section`
  --header: 48px;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - var(--header));
  overflow-y: hidden;
`;

const Top = styled.div`
  ${mobileOnly};
  width: 100%;
  height: 48px;

  ${({ theme }) => theme.device.mobile} {
    ${flex("start", "center", true)};
  }
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  ${mobileHidden};
  height: auto;
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpenMobileList ? "block;" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  transition: display 500ms ease-in-out;
  z-index: var(--indexSidebar);
`;

const MobileListContainer = styled.div`
  ${mobileOnly};

  position: absolute;
  top: 48px;
  left: ${(props) => (props.isOpenMobileList ? `0;` : `-260px;`)};
  width: 260px;
  transition: left 500ms ease-in-out;
  z-index: var(--indexModal);
`;

export default DocView;
