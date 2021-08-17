export const regex = {
  commaAndTrim: /\s*(?:,|$)\s*/, // 공백을 모두 제거하고, ","로 구분
  validKorean: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, // 한글 포함인지 확인
};
