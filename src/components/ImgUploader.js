import AWS from 'aws-sdk';
import styled from 'styled-components';


const ImgUploader = (props) => {
  AWS.config.update({
    region: 'ap-northeast-2',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a2a935f7-cd6a-47b9-8e6b-c02b7b2e0bb2", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),

  });

  return(
    <>
      <input type="file" id="upload" className="image-upload" />
      <label htmlFor="upload" className="image-upload-wrapper"></label>
    </>
  )
}


