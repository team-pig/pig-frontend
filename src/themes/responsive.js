import { css } from "styled-components";

// 모바일에서만 안보임 (모바일: 안보임 / 태블릿: 보임 / 데스크탑: 보임)
export const mobileHidden = css`
  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

// 모바일에서만 보임 (모바일: 보임 / 태블릿: 안보임 / 데스크탑: 안보임)
export const mobileOnly = css`
  display: none;
  ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

// 태블릿(1024px)부터 모바일까지 안보임 (모바일: 안보임 / 태블릿: 안보임 / 데스크탑: 보임)
export const desktopOnly = css`
  display: block;
  ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

// 데스크탑에서만 안보임 (모바일: 보임 / 태블릿: 보임 / 데스크탑: 안보임)
export const desktopHidden = css`
  display: none;

  ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;
