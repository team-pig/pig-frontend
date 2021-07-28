import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Prism from "prismjs";

// redux
import { __createDoc, __editDoc } from "../redux/modules/document";

// toast UI editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

// elem
import { Button } from "../elem";

const Writer = ({ targetDoc }) => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const dispatch = useDispatch();
  const editorRef = useRef();
  const [title, setTitle] = useState(targetDoc ? targetDoc.title : "");

  // editor 옵션 설정
  const editorOpt = {
    previewStyle: "vertical",
    height: "500px", // 디자인에 따라 변경 예정
    initialEditType: "markdown",
    useCommandShortcut: true,
    previewHighlight: false,
    ref: editorRef,
    initialValue: targetDoc ? targetDoc.content : "",
    // colorSyntax: 글자 색 바꾸는 기능 / condeSyntaxHighlight : 언어에 따른 코드 색 변경
    plugins: [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]],
  };

  const getContent = () => {
    if (title.trim() === "") {
      // 모달로 대체 필요
      alert("제목을 입력해주세요.");
    }

    const instance = editorRef.current.getInstance();
    const content_html = instance.getHTML();

    return { title, content: content_html };
  };

  const clickSave = () => {
    const docObj = getContent();
    console.log(docObj);
    dispatch(__createDoc(docObj, roomId));
  };

  const clickEdit = () => {
    const docObj = { ...getContent(), docId };
    console.log(docObj);

    dispatch(__editDoc(docObj, roomId));
  };

  const clickCancle = () => {
    targetDoc
      ? history.push(`/workspace/${roomId}/doc/${docId}`)
      : history.goBack();
  };

  return (
    <>
      <TitleInput
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor {...editorOpt} />
      <div>
        {targetDoc && <Button _onClick={clickEdit}>수정</Button>}
        {!targetDoc && <Button _onClick={clickSave}>저장</Button>}
        <Button _onClick={clickCancle}>취소</Button>
      </div>
    </>
  );
};

const TitleInput = styled.input`
  position: relative;
  z-index: 90;
`;

export default Writer;