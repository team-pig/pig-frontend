import { css } from "styled-components";

export const scrollbar = css`
  &::-webkit-scrollbar {
    width: 7px;
    background-color: var(--white);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--grey);
    border-radius: 3px;
  }
`;
