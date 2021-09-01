import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import flex from "../themes/flex";
import { button } from "../themes/textStyle";

const Avatar = ({ target, size }) => {
  const [name, setName] = useState(" ");

  useEffect(() => {
    if (target) {
      setName(target.nickname ? target.nickname : target.memberName);
    }
  }, [target]);
  return (
    <>
      {target && target.avatar && <ProfileImg target={target} size={size} />}
      {target && name && !target.avatar && (
        <ProfileImg target={target} size={size}>
          {name[0]}
        </ProfileImg>
      )}
    </>
  );
};
const ProfileImg = styled.div`
  ${flex()};
  flex-shrink: 0;
  width: ${(props) => `${props.size}px;`};
  height: ${(props) => `${props.size}px;`};
  border-radius: 50%;
  ${(props) => {
    if (props.target.avatar) {
      return css`
        background-image: ${(props) => `url(${props.target.avatar});`};
        background-size: cover;
        background-position: center center;
      `;
    }
    return css`
      ${button};
      color: ${(props) => {
        if (props.target.color === "mint" || props.target.color === "yellow") {
          return "var(--darkgrey);";
        }
        return "var(--white);";
      }}
      background-color: ${(props) => props.theme.colors[props.target.color]};
    `;
  }}
`;

export default Avatar;
