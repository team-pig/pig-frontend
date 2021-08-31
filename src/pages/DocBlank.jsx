import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// component
import DocList from "../feature/document/DocList";
import BlankImg from "../assets/img/doc-blank-img.jpg";
import ResizeWidth from "../components/ResizeWidth";
import flex from "../themes/flex";
import { mobileHidden, mobileOnly } from "../themes/responsive";
import MobileDocHeader from "../feature/document/MobileDocHeader";
import JoyrideContainer from "../feature/tutorial/JoyrideContainer";

// redux & api
import { resizeDocList } from "../redux/modules/resize";
import { docSteps } from "../feature/tutorial/tutorialSteps";

const DocBlank = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const docList = useSelector((state) => state.document.docList) || [];
  const { isMobile, docListWidth } = useSelector((state) => state.resize);
  const tutorial = useSelector((state) => state.user.tutorial);

  const [isOpenMobileList, setIsOpenMobileList] = useState(false);

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

  const clickShowList = () => setIsOpenMobileList((pre) => !pre);

  // Joyride(튜토리얼)
  const [isShowTutorial, setIsShowTutorial] = useState(false);

  useEffect(() => {
    if (tutorial && tutorial["document"] === true && isShowTutorial === false) {
      setIsShowTutorial(true);
    }
  }, [tutorial, isShowTutorial]);

  return (
    <>
      <JoyrideContainer
        run={isShowTutorial}
        setRun={setIsShowTutorial}
        steps={docSteps}
        page="document"
      />
      <Container className="ws-doc-blank">
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
          <Content className="doc-blank-content" left={size.width}>
            <ImgBox>
              <BlankImgBox src={BlankImg} />
            </ImgBox>
          </Content>
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
    </>
  );
};

const Container = styled.section`
  --header: 48px;
  --padding: 40px;
  --minusHeight: calc(var(--header) + var(--padding) + 20px);

  ${flex("start", "start", false)};
  gap: 20px;
  width: 100%;
  min-height: calc(100vh - var(--minusHeight));

  ${({ theme }) => theme.device.mobile} {
    gap: 0;
    height: calc(100vh - var(--header));
  }
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
  flex-grow: 1;
  width: 100%;
`;

const ListContainer = styled.div`
  ${mobileHidden};
`;

const Content = styled.section`
  --header: 48px;
  --mobileList: 48px;

  ${flex};
  position: relative;
  top: 0;
  left: ${(props) => `${props.left}px;`};
  width: ${(props) => `calc(100% - ${props.left}px)`};
  height: 100%;
  min-height: calc(100vh - var(--header));
  background-color: var(--white);
  font-size: 2rem;
  overflow: hidden;

  ${({ theme }) => theme.device.mobile} {
    left: 0;
    width: 100%;
    height: calc(100% - var(--header) - var(--mobileList));
  }
`;

const ImgBox = styled.div`
  width: 75vmin;
  max-width: 590px;
  min-width: 280px;
`;

const BlankImgBox = styled.div`
  width: 100%;
  padding-top: calc(100% * (392 / 590));
  margin-bottom: 20px;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
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
`;

const MobileListContainer = styled.div`
  ${mobileOnly};

  position: absolute;
  top: 48px;
  left: ${(props) => (props.isOpenMobileList ? `0;` : `-260px;`)};
  width: 260px;
  height: 100%;
  transition: left 500ms ease-in-out;
  z-index: 60;
`;

export default DocBlank;
