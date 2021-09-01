import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

import Graph from "./Graph";
import Tags from "./Tags";
import Icon from "../../components/Icon";

import flex from "../../themes/flex";
import { body_4 } from "../../themes/textStyle";
import MyAvatar from "../../elem/MyAvatar";
import { Text } from "../../elem";

// redux & api
import { __editMyStatus } from "../../redux/modules/todos";

//etc
const MyStatus = () => {
  const dispatch = useDispatch();
  const myStatus = useSelector((state) => state.todos.myStatus);
  const { nickname, desc, tags, checked, notChecked } = myStatus;
  const [editInfo, setEditInfo] = useState({});
  const [viewTag, setViewTag] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { roomId } = useParams();

  useEffect(() => {
    setEditInfo({ desc, tags });
  }, [desc, tags, dispatch]);

  const memberPercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  const onChangeHandler = useCallback(
    ({ target: { value, name } }) => {
      setEditInfo({ ...editInfo, [name]: value });
    },
    [editInfo]
  );

  if (editMode)
    return (
      <Container>
        <EditModeWrapper>
          <EditModeHeader>
            <Name type="head_7" color="black">
              {nickname}
            </Name>
            <ActiveEdit
              onClick={() => {
                setEditMode(false);
                dispatch(
                  __editMyStatus(roomId, {
                    desc: editInfo.desc,
                    tags: editInfo.tags,
                  })
                );
              }}
            >
              <Icon icon="checkbox" size="24px" color="#757575" />
            </ActiveEdit>
          </EditModeHeader>
          <form>
            <>
              <MyInfoEditInput
                tyoe="text"
                name="desc"
                value={editInfo.desc || ""}
                onChange={onChangeHandler}
                placeholder="나의 메시지를 입력하세요 (최대 25자)"
                autoComplete="off"
                maxLength="25"
              />
              <MyInfoEditInput
                type="text"
                name="tags"
                value={editInfo.tags || ""}
                onChange={onChangeHandler}
                placeholder="나의 역할 또는 태그로 나를 표현하세요"
                autoComplete="off"
                maxLength="200"
              />
            </>
          </form>
          <HelpMessage>
            역할은 " , " 로 구분해서 작성할 수 있습니다.
          </HelpMessage>
        </EditModeWrapper>
      </Container>
    );

  return (
    <Container>
      <MemberMain>
        <MyAvatar medium data-tip data-for={nickname} />
        <ReactTooltip
          id={nickname}
          place="top"
          type="light"
          backgroundColor="var(--white)"
          borderColor="var(--line)"
          border={true}
        >
          <span>{nickname}</span>
        </ReactTooltip>
        <GraphBox>
          <Graph color="blue" height="15px" percent={memberPercent} />
        </GraphBox>
        <ActiveEdit
          onClick={() => {
            setEditMode(true);
          }}
        >
          <Icon icon="setting" size="24px" color="#757575" />
        </ActiveEdit>
      </MemberMain>
      <Message>
        <Desc type="body_4" color="darkgrey">
          {desc === null ? "상태 메시지가 없습니다." : desc}
        </Desc>
      </Message>
      <MemberInfo>
        <div
          onClick={() => {
            setViewTag((pre) => !pre);
          }}
        >
          {viewTag ? (
            <ViewTag>
              <TagStatus>
                <div></div>
              </TagStatus>
              <TagButton>
                <>태그 접기</>
                <Icon icon="arrow-down" size="14px" color="var(--grey)" />
              </TagButton>
            </ViewTag>
          ) : (
            <>
              <ViewTag>
                <TagStatus>
                  <div></div>
                </TagStatus>
                <TagButton>
                  <>태그 보기</>
                  <Icon icon="arrow-down" size="14px" color="var(--grey)" />
                </TagButton>
              </ViewTag>
            </>
          )}
        </div>
        {viewTag && (
          <>
            <Tags tag={tags} />
          </>
        )}
        <StatusNums>
          <VerticalLine />
          <Text type="body_2" color="darkgrey">
            {memberPercent}% 완료
          </Text>
          <Text type="body_4" color="grey">
            ({checked} / {checked + notChecked})
          </Text>
        </StatusNums>
      </MemberInfo>
    </Container>
  );
};

const Container = styled.article`
  border-bottom: 1px solid var(--line);
  ${({ theme }) => theme.device.mobile} {
    border: 1px solid red;
    width: 100%;
    padding: 20px;
  }
`;

// 수정모드

const EditModeWrapper = styled.div``;
const EditModeHeader = styled.div`
  ${flex("between", "center")}
  margin-top: 23px;
  margin-bottom: 15px;
`;

const Name = styled(Text)`
  position: relative;
  width: 130px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-right: 8px;
`;

const MyInfoEditInput = styled.input`
  border: 1px solid var(--line);
  height: 30px;
  margin-bottom: 5px;
  padding: 0 10px;
  width: 100%;
`;

const ActiveEdit = styled.div`
  cursor: pointer;
`;

const HelpMessage = styled.div`
  ${body_4}
  text-align: right;
  color: var(--notice);
  margin-bottom: 20px;
`;

// 조회모드

const TagStatus = styled.div`
  color: var(--grey);
`;

const TagButton = styled.div`
  ${flex()};
  gap: 5px;
`;

const ViewTag = styled.div`
  ${flex("between", "center")}
  cursor: pointer;
  gap: 5px;
  margin-bottom: 10px;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: var(--grey);
`;

const MemberMain = styled.div`
  ${flex("start")};
  margin-top: 23px;
  margin-bottom: 15px;
`;

const GraphBox = styled.div`
  margin: 0 23px;
  width: 200px;
  flex-shrink: 0;
`;

const Desc = styled.div`
  ${body_4};
  color: var(--darkgrey);
`;

const MemberInfo = styled.div`
  ${body_4};
  color: var(--darkgrey);
  margin-bottom: 25px;
`;

const StatusNums = styled.div`
  ${flex("start", "center")};
  margin-top: 10px;
  gap: 13px;
  height: 30px;
`;

const Message = styled.div`
  ${flex("between", "center")}
  margin-bottom: 10px;
`;

export default React.memo(MyStatus);
