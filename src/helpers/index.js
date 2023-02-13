import S3 from "react-aws-s3";

const config1 = {
  bucketName: "sunrisetechs",
  dirName: "maars/nfts",
  region: "ap-southeast-2",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
};
export const ReactS3Client = new S3(config1);