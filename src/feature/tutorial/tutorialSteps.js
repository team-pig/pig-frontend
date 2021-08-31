export const roomListSteps = [
  {
    target: ".make-room",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[방 만들기]</strong>
        <br />팀 별 혹은 프로젝트 별로 방을 만들 수 있는 공간입니다. 다른 사람이
        만든 방에 초대코드로 입장도 할 수 있어요!
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".enter-room",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[방 입장하기]</strong>
        <br />
        다른 사람에게 받은 초대코드가 있다면 이 버튼을 눌러 방에 입장하세요!
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".room-list",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[방 목록]</strong>
        <br />
        방을 만들거나 방에 입장하시면 내가 속해있는 방들이 여기에 나타납니다.
      </div>
    ),
    placement: "auto",
    disableBeacon: true,
    disableScrolling: true,
  },
  // {
  //   target: ".invitation-code",
  //   locale: { skip: <strong aria-label="skip">SKIP</strong> },
  //   content: (
  //     <div>
  //       <strong>[초대코드 복사하기]</strong>
  //       <br />이 버튼을 눌러 초대코드를 복사하고, 초대하고 싶은 사람들에게
  //       전해주세요!
  //     </div>
  //   ),
  //   placement: "auto",
  //   disableBeacon: true,
  //   disableScrolling: true,
  // },
];

export const mainSteps = [
  {
    target: ".ws-main",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[메인]</strong> <br /> 프로젝트 업무 현황 및 방 정보, 나의 할 일
        목록을 볼 수 있는 공간입니다.
      </div>
    ),
    placement: "center",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".status",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[프로젝트 현황]</strong> <br /> 프로젝트의 완료 현황을 볼 수
        있는 공간입니다. 팀원 현황에서는 팀원 별 완료 현황을 볼 수 있어요.
        <br />
        *그래프는 할 일(TO-DO)의 개수로 측정됩니다*
      </div>
    ),
    placement: "right",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".information",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[방 정보 보기]</strong> <br /> 방의 정보를 모두 볼 수 있습니다.
        수정은 이 방을 만든 '마스터'만 할 수 있습니다.
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".mytodos",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[나의 할 일 목록]</strong> <br /> 나에게 주어진 일을 확인할 수
        있는 공간입니다. 주어진 일이 없다면 '보드'나 '일정'에서 스스로에게 할
        일을 만들어 주세요☺
      </div>
    ),
    placement: "top",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".chat-sidebar",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[채팅]</strong> <br /> 방 멤버들끼리 대화 할 수 있는
        채팅창입니다. 메세지를 입력해서 멤버들에게 말을 걸어보세요!
      </div>
    ),
    placement: "left",
    disableBeacon: true,
    disableScrolling: true,
  },
];

export const docSteps = [
  {
    target: ".ws-doc-blank",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[문서]</strong> <br /> 협업에 필요한 문서들을 작성하고 공유할 수
        있는 공간입니다.
      </div>
    ),
    placement: "center",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".doc-add-btn",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[문서 추가하기]</strong> <br /> 이 버튼을 누르면 새 문서를
        작성할 수 있습니다.
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".doc-list",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[문서 리스트]</strong> <br /> 작성한 문서목록을 한 눈에 볼 수
        있는 공간입니다. 문서를 추가해보세요!
      </div>
    ),
    placement: "right",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".doc-blank-content",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[문서 공간]</strong> <br /> 문서를 작성하시면 이 공간에 문서
        내용을 자세히 볼 수 있습니다.
      </div>
    ),
    placement: "center",
    disableBeacon: true,
    disableScrolling: true,
  },
];

export const boardSteps = [
  {
    target: ".ws-board",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[보드]</strong> <br /> 프로젝트의 이슈와 할 일을 게시하고
        관리하는 공간입니다. <br /> 버킷 > 카드 > 할 일(TO-DO) 순으로 내 일을
        관리해보세요.
      </div>
    ),
    placement: "center",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".buckets",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[버킷]</strong> <br /> 카드들을 정리할 수 있는 바구니라고
        생각해주시면 됩니다. 버킷 제목을 눌러 버킷 간 위치를 바꿀 수 있어요.
      </div>
    ),
    placement: "auto",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".add-card",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[카드 추가하기]</strong> <br /> 이 버튼을 누르면 카드를 추가할
        수 있어요. 카드를 만들어 내가 해야 할 일을 적어보세요!
      </div>
    ),
    placement: "auto",
    disableBeacon: true,
    disableScrolling: true,
  },
];

export const modalSteps = [
  {
    target: ".ws-board",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[카드 수정 공간]</strong> <br /> 해야할 일을 제목에 적고, 그
        일을 수행하기 위해 필요한 정보, 세부 사항을 적어 프로젝트를 관리할 수
        있습니다.
      </div>
    ),
    placement: "center",
    disableBeacon: true,
    disableScrolling: true,
  },
];

export const calendarSteps = [
  {
    target: ".ws-calendar",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[타임라인]</strong> <br /> 보드에서 생성한 카드(일정)를
        타임라인의 달력에서도 확인하실 수 있습니다.
        <br />
        타임라인에서는 일정을 날짜 별로 확인·관리할 수 있도록 도와드립니다.
      </div>
    ),
    placement: "center",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".calendar-info",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[일정 리스트]</strong> <br /> 선택한 날짜의 카드를 모두 확인할
        수 있는 공간입니다.
      </div>
    ),
    placement: "right",
    disableBeacon: true,
    disableScrolling: true,
  },
  {
    target: ".add-schedule",
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    content: (
      <div>
        <strong>[일정 추가하기]</strong> <br /> 버튼을 누르면 일정이 추가됩니다.
      </div>
    ),
    placement: "right",
    disableBeacon: true,
    disableScrolling: true,
  },
];
