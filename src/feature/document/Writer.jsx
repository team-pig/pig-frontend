import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Prism from "prismjs";

// redux
import { __createDoc, __editDoc } from "../../redux/modules/document";

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
import { Button } from "../../elem";
import { uploadFile } from "../../shared/uploadFile";
import { head_4 } from "../../themes/textStyle";

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
    hooks: {
      addImageBlobHook: async (blob, callback) => {
        const imgUrl = await uploadFile(blob);
        callback(imgUrl, "alt text");
      },
    },
  };

  const getContent = () => {
    if (title.trim() === "") {
      // 모달로 대체 필요
      alert("제목을 입력해주세요.");
    }

    const instance = editorRef.current.getInstance();
    // const content_html = instance.getHTML();
    const content_md = instance.getMarkdown();

    return { title, content: content_md };
  };

  const clickSave = () => {
    const docObj = getContent();
    dispatch(__createDoc(docObj, roomId));
  };

  const clickEdit = () => {
    const docObj = { ...getContent(), docId };
    dispatch(__editDoc(docObj, roomId));
  };

  const clickCancle = () => {
    targetDoc
      ? history.push(`/workspace/${roomId}/doc/${docId}`)
      : history.replace(`/workspace/${roomId}/doc/blank`);
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
      <Editor {...editorOpt} />
      <div>
        {targetDoc && <Button _onClick={clickEdit}>수정</Button>}
        {!targetDoc && <Button _onClick={clickSave}>저장</Button>}
        <Button _onClick={clickCancle}>취소</Button>
      </div>
    </>
  );
};

const TitleBox = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 var(--smMargin);
  margin-bottom: 14px;
`;

const TitleInput = styled.input`
  ${head_4};
  width: 100%;
`;

export default Writer;
