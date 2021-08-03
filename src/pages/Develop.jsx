import React from "react";
import { Text, Button, Input } from "../elem";

const Develop = () => {
  return (
    <div>
      <Text type="head_1">테스트</Text>
      <Text type="head_2">테스트</Text>
      <Text type="head_3">테스트</Text>
      <Text type="head_4">테스트</Text>
      <Text type="head_5">테스트</Text>
      <Text type="head_6">테스트</Text>
      <Text type="sub_1">테스트</Text>
      <Text type="sub_2">테스트</Text>
      <Text type="body_1">테스트</Text>
      <Text type="body_2">테스트</Text>
      <Text type="body_3">테스트</Text>
      <Text type="body_4">테스트</Text>
      <Text type="gnb">GNB name</Text>
      <Text type="caption">CAPTION</Text>
      <br />
      <Button fill full>
        버튼
      </Button>
      <br />
      <Button fill large>
        버튼
      </Button>
      <br />
      <Button fill small>
        버튼
      </Button>
      <br />
      <Button outline large>
        버튼
      </Button>
      <br />
      <div style={{ margin: "10px" }}>
        <Input placeholder="이메일" />
      </div>
      <div style={{ margin: "10px" }}>
        <Input />
      </div>
      <div style={{ margin: "10px" }}>
        <Input type="error" />
      </div>
    </div>
  );
};

export default Develop;
