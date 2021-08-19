import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { Text } from "../../elem";
import Icon from "../../components/Icon";
import Graph from "./Graph";
import Tags from "./Tags";
import { body_4 } from "../../themes/textStyle";

// redux & api
import { __editMyProfile } from "../../redux/modules/dashBoard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//etc
const MyStatus = ({ myInfo, setMyInfo }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { total, checkedTodo } = useSelector(
    (state) => state.todos.myTodoCount
  );

  const { nickname, desc, checked, notChecked, tags } = myInfo;
  const { roomId } = useParams();

  const memberPercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checkedTodo / total) * 100).toFixed(0);

  const onChangeHandler = useCallback(
    ({ target: { value, name } }) => {
      setMyInfo({ ...myInfo, [name]: value });
    },
    [myInfo, setMyInfo]
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
                  __editMyProfile(roomId, {
                    desc: myInfo.desc,
                    tags: myInfo.tags,
                  })
                );
              }}
            >
              <Icon icon="checkbox" size="24px" color="#757575" />
            </ActiveEdit>
          </EditModeHeader>
          <form
            onSubmit={() => {
              setEditMode(false);
              dispatch(
                __editMyProfile(roomId, {
                  desc,
                  tags,
                })
              );
            }}
          >
            <MyInfoEditInput
              tyoe="text"
              name="desc"
              value={desc || ""}
              onChange={onChangeHandler}
            />
            <MyInfoEditInput
              type="text"
              name="tags"
              value={tags || ""}
              onChange={onChangeHandler}
            />
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
        <Name type="head_7" color="black">
          {nickname}
        </Name>
        <ActiveEdit
          onClick={() => {
            setEditMode(true);
          }}
        >
          <Icon icon="setting" size="24px" color="#757575" />
        </ActiveEdit>
        <GraphBox>
          <Graph color="mint" height="15px" percent={memberPercent} />
        </GraphBox>
      </MemberMain>
      <Message>
        <Desc type="body_4" color="darkgrey">
          {desc === null ? "상태 메시지가 없습니다." : desc}
        </Desc>
        <StatusNums>
          <Text type="body_2" color="darkgrey">
            {memberPercent}% 완료
          </Text>
          <Text type="body_4" color="grey">
            ({checkedTodo} / {total})
          </Text>
        </StatusNums>
      </Message>
      <MemberInfo>
        <Tags tag={tags} />
      </MemberInfo>
    </Container>
  );
};

const Container = styled.article`
  border-bottom: 1px solid var(--line);
`;

const MemberMain = styled.div`
  ${flex("start")};
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

const GraphBox = styled.div`
  width: 220px;
  margin-left: 50px;
  flex-shrink: 0;
`;

const Desc = styled.div`
  ${body_4};
  color: var(--darkgrey);
`;
const MemberInfo = styled.div`
  ${flex("start")};
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const StatusNums = styled.div`
  ${flex("start", "center")};
  gap: 13px;
  height: 30px;
`;

const MyInfoEditInput = styled.input`
  border: 1px solid var(--line);
  height: 30px;
  margin-bottom: 5px;
  padding: 0 10px;
  width: 100%;
`;

const EditModeWrapper = styled.div``;
const EditModeHeader = styled.div`
  ${flex("between", "center")}
  margin-top: 23px;
  margin-bottom: 15px;
`;

const ActiveEdit = styled.div`
  cursor: pointer;
`;

const Message = styled.div`
  ${flex("between", "center")}
  margin-bottom: 10px;
`;

const HelpMessage = styled.div`
  ${body_4}
  text-align: right;
  color: var(--notice);
  margin-bottom: 20px;
`;

export default React.memo(MyStatus);
