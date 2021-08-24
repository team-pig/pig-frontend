import React, { useCallback, useEffect, useRef, useState } from "react";
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

// redux & api
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { __editRoomDetail } from "../../redux/modules/room";

const Information = () => {
  const { roomId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const editorRef = useRef();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.roomInfos);
  const my = useSelector((state) => state.user.user.userId);
  const { roomName, desc, tag, subtitle, master } = room;

  useEffect(() => {
    setEditedInfo({ roomName, desc, tag, subtitle }); // onChange input value
  }, [roomName, desc, tag, subtitle]);

  // Editor option
  const mainEditorOpt = {
    previewStyle: "tab",
    initialEditType: "markdown",
    useCommandShortcut: true,
    previewHighlight: false,
    height: "300px",
    ref: editorRef,
    initialValue: desc,
  };

  const mainViewerOpt = {
    initialValue: desc,
  };

  const getContent = () => {
    const instance = editorRef.current.getInstance();
    const content_md = instance.getMarkdown();
    return content_md;
  };

  const clickSave = () => {
    if (!roomName.trim()) {
      alert("제목을 한 글자 이상 작성해주세요.");
      return;
    }
    const currentContent = getContent();

    const newInfo = {
      ...editedInfo,
      desc: currentContent,
    };

    dispatch(__editRoomDetail(roomId, newInfo));
    setEditMode((pre) => !pre);
  };

  const handleChange = useCallback((key, value) => {
    setEditedInfo((pre) => ({ ...pre, [key]: value }));
  }, []);

  if (editMode) {
    return (
      <Container>
        <TitleBox>
          <TitleInput
            type="text"
            placeholder="제목을 입력하세요"
            value={editedInfo.roomName}
            onChange={(e) => handleChange("roomName", e.target.value)}
          />
          <TextBtn onClick={clickSave}>
            <Text type="button" color="darkgrey">
              완료
            </Text>
          </TextBtn>
        </TitleBox>
        <TagContainer>
          <TagsInput
            type="text"
            placeholder="태그는 ','으로 구분하여 입력해주세요."
            value={editedInfo.tag}
            onChange={(e) => handleChange("tag", e.target.value)}
          />
        </TagContainer>
        <Textarea
          value={editedInfo.subtitle}
          minHeight={40}
          _onChange={(e) => handleChange("subtitle", e.target.value)}
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
          {roomName}
        </Text>
        {my === master && (
          <IconBtn
            _onClick={() => {
              setEditMode((pre) => !pre);
            }}
          >
            <Icon icon="edit" color="#757575" size="24px" />
          </IconBtn>
        )}
      </TitleBox>
      <TagContainer>
        <Tags tag={tag} gap="14" textType="sub_2" color="dargrey" />
      </TagContainer>
      {subtitle && (
        <SubTitle type="sub_1" color="grey">
          {subtitle}
        </SubTitle>
      )}
      <Line />
      <ViewerContainer padding={true}>
        {desc && <MarkDownViewer option={mainViewerOpt} />}
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

const SubTitle = styled(Text)`
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

export default React.memo(Information);
