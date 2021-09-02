import React, {useEffect, useCallback} from "react";
import _ from "lodash";

const InfinityScroll = ({  children, callNext, isNext, isLoading }) => {

  // 스크롤이 닿으면 다음 방 목록을 서버에 요청해 불러옴, callNext에 dispatch(__getRoomList(paging.next));
 //  throttle 일정주기(길이)마다 실행, 스크롤을 내리면서(멈추지 않은 상태) 화면이 띄워져야함
  const _defaultHandleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

      // 현재 스크롤된 높이를 구함
    if (scrollHeight - innerHeight - scrollTop < 600) {
     
      callNext();
    }
  }, 700);

  const defaultHandleScroll = useCallback(_defaultHandleScroll, [isLoading]);

  useEffect(() => {
    // 로딩 중일 때는 추가 요청하지 않음
    if (isLoading) {
      return;
    }
    if (isNext) {
      // 다음 페이지가 있을 때 다음 페이지 불러오는 함수 실행
      window.addEventListener("scroll", defaultHandleScroll);
    } else{
      window.removeEventListener("scroll", defaultHandleScroll);
    }
    return () => window.removeEventListener("scroll", defaultHandleScroll);
  }, [isNext, isLoading]);

  return <>{children}</>;
};

export default InfinityScroll;
