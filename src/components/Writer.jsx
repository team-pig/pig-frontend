import React, { useRef } from "react";
import Prism from "prismjs";

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
  const editorRef = useRef();

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

  return (
    <>
      <Editor {...editorOpt} />
      <Button type="submit">제출</Button>
    </>
  );
};

export default Writer;
