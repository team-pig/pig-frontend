import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux & api
import { __deleteDoc } from "../../redux/modules/document";
import { docApi } from "../../api/docApi";

// toast UI viewer
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

// elem
import { Text } from "../../elem";
import Icon from "../../components/Icon";
import { body_4 } from "../../themes/textStyle";

const DocViewer = () => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const dispatch = useDispatch();

  const [current, setCurrent] = useState({
    title: "",
    content: "",
  });

  // 최적화 반드시 필요✨
  const currentDoc = useSelector((state) => {
    const idx = state.document.docList.findIndex((doc) => doc.docId === docId);
    return state.document.docList[idx];
  });

  useEffect(() => {
    setCurrent({
      title: currentDoc ? currentDoc.title : "",
      content: currentDoc ? currentDoc.content : "",
    });
  }, [currentDoc, dispatch]);

  const viewerOpt = {
    initialValue: current.content,
  };

  const toDocEdit = async (docId) => {
    try {
      const { data } = await docApi.checkCanEdit(roomId, docId);

      if (data.canEdit) history.push(`/workspace/${roomId}/doc/${docId}/edit`);
      else alert(`현재${data.nickname}님이 수정중입니다.`);
    } catch (e) {
      console.log(e);
    }
  };

  const clickDelete = () => {
    // 정말 삭제할거냐는 안내 모달 필요
    dispatch(__deleteDoc(docId, roomId));
  };

  return (
    <Container>
      <ViewerHeader>
        <TitleBox>
          <Text type="head_4">{current.title}</Text>
          {/* 임시 적용 아이콘 => 변경 예정 */}
          <IconBtn onClick={() => toDocEdit(docId)}>
            <Icon icon="edit" size="24px" color="#757575" />
          </IconBtn>
          <button onClick={clickDelete}>삭제아이콘</button>
        </TitleBox>
        <InfoBox>
          마지막 편집
          <User>{"안나"}</User>
          <ModifiedTime>10분 전</ModifiedTime>
        </InfoBox>
      </ViewerHeader>
      <div></div>
      {current.content && <Viewer {...viewerOpt}></Viewer>}
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: calc(100% - 260px);
  padding: var(--smMargin);
`;

const ViewerHeader = styled.div`
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 14px;
`;

const InfoBox = styled.div`
  ${body_4};
  display: flex;
  justify-content: flex-end;
  color: var(--grey);
`;

const IconBtn = styled.button``;

const User = styled.span`
  margin-left: 14px;
`;

const ModifiedTime = styled.span`
  color: var(--notice);

  &::before {
    content: "·";
    margin: 0 4px;
    color: var(--grey);
  }
`;

export default DocViewer;
