// desktop 여부 확인(노트북 포함)
// desktop에서는 touchPoints가 0, 이외 모바일 기기(스마트폰, 태블릿PC에서는 > 1)
const checkDesktop = () => {
  let touchPoints = navigator.maxTouchPoints;

  let desktop = touchPoints === 0;
  return desktop;
};

export default checkDesktop;
