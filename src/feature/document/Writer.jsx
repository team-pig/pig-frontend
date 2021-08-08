import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// redux
import { __createDoc, __editDoc } from "../../redux/modules/document";

// component
import MarkDownEditor from "../../components/MarkDownEditor";

// elem
import { head_4 } from "../../themes/textStyle";
import flex from "../../themes/flex";
import { Button } from "../../elem";

const Writer = ({ targetDoc, setShowPrompt }) => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const dispatch = useDispatch();
  const editorRef = useRef();
  const [title, setTitle] = useState(
    targetDoc && targetDoc.title ? targetDoc.title : ""
  );

  const docs = useSelector((state) => state.document.docList);

  // editor 옵션 설정
  const documentOpt = {
    ref: editorRef,
    initialValue: targetDoc ? targetDoc.content : "",
  };

  const getContent = () => {
    const instance = editorRef.current.getInstance();
    // const content_html = instance.getHTML();
    const content_md = instance.getMarkdown();

    return { title, content: content_md };
  };

  const clickSave = () => {
    if (!title || title.trim() === "") {
      // 모달로 대체 필요
      alert("제목을 입력해주세요.");
      return;
    }

    const docObj = getContent();
    dispatch(__createDoc(docObj, roomId));
  };

  const clickEdit = () => {
    if (!title || title.trim() === "") {
      // 모달로 대체 필요
      alert("제목을 입력해주세요.");
      return;
    }

    setShowPrompt(false);
    const docObj = { ...getContent(), docId };
    dispatch(__editDoc(docObj, roomId));
  };

  const clickCancle = () => {
    targetDoc
      ? history.push(`/workspace/${roomId}/doc/${docId}`)
      : history.replace(
          `/workspace/${roomId}/doc/${
            docs.length !== 0 ? docs[0].docId : "blank"
          }`
        );
  };

  return (
    <>
      <TitleBox>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </TitleBox>
      <EditorContainer>
        <MarkDownEditor option={documentOpt} />
      </EditorContainer>

      <BtnBox>
        <Button _onClick={clickCancle} shape="green-outline" size="150">
          취소
        </Button>
        {targetDoc && (
          <Button _onClick={clickEdit} size="150">
            수정
          </Button>
        )}
        {!targetDoc && (
          <Button _onClick={clickSave} size="150">
            저장
          </Button>
        )}
      </BtnBox>
    </>
  );
};

const TitleBox = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  border: 1px solid var(--line);
`;

const TitleInput = styled.input`
  ${head_4};
  width: 100%;
  height: 100%;
  color: var(--black);
  padding: var(--xsMargin);
`;

const EditorContainer = styled.div`
  --header: 48px; // header 높이
  --input: 60px; // input 높이
  --totalMargin: 40px; // InputHeader의 주변 margin or padding(위아래만)
  --btnbox: 90px; // btn 높이 + 위아래 padding
  --minusHeight: calc(
    var(--header) + var(--input) + var(--totalMargin) + var(--btnbox)
  );

  width: 100%;
  height: calc(100vh - var(--minusHeight));
`;

const BtnBox = styled.div`
  ${flex("end")};
  gap: 20px;
  width: 50%;
  padding: 20px;
  margin-bottom: -20px;
`;

export default Writer;
