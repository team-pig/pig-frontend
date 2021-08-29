import { css } from "styled-components";

export const scrollbar = css`
  &::-webkit-scrollbar {
    display: block;
    width: 10px;
    height: 10px;
    background-color: var(--white);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--grey);
    border-radius: 5px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;
