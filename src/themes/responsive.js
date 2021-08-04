import { css } from "styled-components";

export const mobileHidden = css`
  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const mobileOnly = css`
  display: none;
  ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;
