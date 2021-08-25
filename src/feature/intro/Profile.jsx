import React from "react";
import styled from "styled-components";
import { body_2, body_3, sub_1 } from "../../themes/textStyle";
import flex from "../../themes/flex";

const Profile = ({ member }) => {
  const { name, role, tags, desc, avatar } = member;
  return (
    <Container>
      <Info>
        <Photo src={avatar} />
        <div>
          <Name>{name}</Name>
          <Role>{role}</Role>
        </div>
      </Info>
      <Tags>{tags}</Tags>
      <Desc>{desc}</Desc>
    </Container>
  );
};

const Container = styled.div`
  /* min-width: 300px; */
  max-width: 100%;
  height: 255px;
  padding: 20px;
  border: 1px solid var(--grey);
  border-radius: 4px;
`;

const Info = styled.div`
  ${flex("start", "center")}
  margin-bottom: 25px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 14px;
`;

const Name = styled.div`
  ${sub_1}
`;

const Role = styled.div`
  ${body_2}
  color: var(--darkgrey);
`;

const Tags = styled.div`
  ${body_2}
  color: var(--darkgrey);
  margin-bottom: 4px;
`;

const Desc = styled.div`
  ${body_3}
  color: var(--primary);
`;

export default Profile;
