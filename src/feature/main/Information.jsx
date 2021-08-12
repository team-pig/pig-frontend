import React, { useRef, useState } from "react";
import styled from "styled-components";

// component
import MarkDownEditor from "../../components/MarkDownEditor";
import MarkDownViewer from "../../components/MarkDownViewer";
import Tags from "./Tags";

// elem
import { Text, Textarea, IconBtn } from "../../elem";
import { head_2, sub_2 } from "../../themes/textStyle";
import Icon from "../../components/Icon";
import flex from "../../themes/flex";

const Information = () => {
  const [editMode, setEditMode] = useState(false);

  const editorRef = useRef();

  const [info, setInfo] = useState({
    title: "협업돼지꿀꿀",
    tags: ["태그1", "태그2", "태그3", "태그4"],
    desc: "안녕하세요 협업돼지입니다.",
    content: "### 개요를 입력해주세요.",
  });

  const [editedInfo, setEditedInfo] = useState({
    ...info,
    tags: info.tags.join(", "),
  });

  const mainEditorOpt = {
    previewStyle: "tab",
    initialEditType: "markdown",
    useCommandShortcut: true,
    previewHighlight: false,
    height: "300px",
    ref: editorRef,
    initialValue: editedInfo.content,
    // colorSyntax: 글자 색 바꾸는 기능 / condeSyntaxHighlight : 언어에 따른 코드 색 변경
  };

  const toggleEditMode = () => {
    setEditMode((pre) => !pre);
  };

  const mainViewerOpt = {
    initialValue: info.content,
  };

  const getContent = () => {
    const instance = editorRef.current.getInstance();
    const content_md = instance.getMarkdown();

    return content_md;
  };

  const clickSave = () => {
    if (!info.title.trim()) {
      alert("제목을 한 글자 이상 작성해주세요.");
      return;
    }

    const currentContent = getContent();
    const newInfo = {
      ...editedInfo,
      content: currentContent,
      tags: editedInfo.tags.split(",").map((info) => info.trim()),
    };

    setInfo(newInfo);
    toggleEditMode();
  };

  const handleChange = (key, value) => {
    setEditedInfo((pre) => ({ ...pre, [key]: value }));
  };

  if (editMode) {
    return (
      <Container>
        <TitleBox>
          <TitleInput
            type="text"
            placeholder="제목을 입력하세요"
            value={editedInfo.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <TextBtn onClick={clickSave}>
            <Text type="button" color="darkgrey">
              완료
            </Text>
          </TextBtn>
        </TitleBox>
        <TagContainer>
          {/* 태그 ','으로 구분하여 입력하도록 설정 */}
          <TagsInput
            type="text"
            placeholder="태그는 ','으로 구분하여 입력해주세요."
            value={editedInfo.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
          />
        </TagContainer>
        <Textarea
          value={editedInfo.desc}
          minHeight={40}
          _onChange={(e) => handleChange("desc", e.target.value)}
        />
        <EditorContainer>
          <MarkDownEditor option={mainEditorOpt} />
        </EditorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <TitleBox>
        <Text type="head_2" color="black">
          {info.title}
        </Text>
        <IconBtn _onClick={toggleEditMode}>
          <Icon icon="edit" color="#757575" size="24px" />
        </IconBtn>
      </TitleBox>
      <TagContainer>
        <Tags tags={info.tags} gap="14" textType="sub_2" color="dargrey" />
      </TagContainer>
      {info.desc && (
        <Desc type="sub_1" color="grey">
          {info.desc}
        </Desc>
      )}
      <Line />
      <ViewerContainer padding={true}>
        <MarkDownViewer option={mainViewerOpt} />
      </ViewerContainer>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid var(--line);
`;

const TitleBox = styled.div`
  ${flex("between")}
  width: 100%;
  height: 52px;
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  ${head_2};
  width: 100%;
  height: 52px;
  color: var(--black);
`;

const TextBtn = styled.button`
  width: 78px;
  height: 42px;
`;

const TagContainer = styled.div`
  height: 30px;
  margin-bottom: 25px;
`;

const TagsInput = styled.input`
  ${sub_2};
  width: 100%;
  height: 100%;
`;

const Desc = styled(Text)`
  min-height: 40px;
  word-break: break-all;
  padding: 0 12px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  margin: 18px 0;
  padding: 0 12px;
  background-color: var(--line);
`;

const ViewerContainer = styled.div`
  padding: ${(props) => props.padding && "0 12px;"};
  padding-bottom: 18px;
`;

const EditorContainer = styled.div`
  min-height: 300px;
`;

export default Information;
