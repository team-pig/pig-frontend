import AWS from "aws-sdk";
import styled from "styled-components";

import Input from "../elem/Input";

const ImgUploader = (props) => {
  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a2a935f7-cd6a-47b9-8e6b-c02b7b2e0bb2", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "teampigbucket",
        Key: file.name,
        Body: file,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert("이미지 업로드에 성공했습니다.");
      },
      function (err) {
        return alert("오류가 발생했습니다:", err.message);
      }
    );
  };

  return (
    <>
      <input
        type="file"
        id="upload"
        className="image-upload"
        onChange={handleFileInput}
      />
      <label htmlFor="upload" className="image-upload-wrapper"></label>
    </>
  );
};

export default ImgUploader;
