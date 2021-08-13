import React from "react";
import styled from "styled-components";

// component & elem
import Graph from "./Graph";
import { Text } from "../../elem";
import flex from "../../themes/flex";

const ProjectStatus = ({ projectStatus }) => {
  const { checked, notChecked } = projectStatus;
  const guagePercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  return (
    <Project>
      <Text type="body_1">프로젝트 현황</Text>
      <ProjectInfo>
        <Text type="sub_2" color="">
          {guagePercent}% 완료
        </Text>
        <Line />
        {/*  date를 기준으로 마감일 표시 하는 기능 추가 예정*/}
        <Text type="sub_2" color="notice">
          {/* 프로젝트 마감 13일 전 */}
          오늘도 힘찬 프로젝트!
        </Text>
      </ProjectInfo>
      <Graph color="violet" height="30px" percent={guagePercent} />
    </Project>
  );
};

const Project = styled.article`
  height: 160px;
  padding: 20px 18px 20px 25px;
  border-bottom: 1px solid var(--line);
`;

const ProjectInfo = styled.div`
  ${flex("start", "center")};
  margin-top: 31px;
  margin-bottom: 10px;
`;

const Line = styled.div`
  height: 2rem;
  width: 1px;
  margin: 0 15px;
  background-color: var(--grey);
`;

export default ProjectStatus;
