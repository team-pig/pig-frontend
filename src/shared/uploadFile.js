// image file 업로드 함수
import AWS from "aws-sdk";

const S3_BUCKET = "teampigbucket";
const REGION = "ap-northeast-2";

AWS.config.update({
  region: REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-northeast-2:a2a935f7-cd6a-47b9-8e6b-c02b7b2e0bb2",
  }),
});

export const uploadFile = async (file) => {
  const params = {
    Body: file,
    Key: file.name,
    Bucket: S3_BUCKET,
    ACL: "public-read",
  };

  const upload = new AWS.S3.ManagedUpload({
    params,
  });

  const { Location } = await upload.promise();
  return Location;
};
