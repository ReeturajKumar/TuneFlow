import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

// Credentials come from AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (SDK reads them from env)
const s3 = new S3Client({ region: process.env.AWS_REGION });
const bucket = process.env.S3_BUCKET;
// Public base URL for objects: a CloudFront domain, or the bucket URL by default
const publicUrl = () =>
  (process.env.S3_PUBLIC_URL || `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com`).replace(/\/$/, "");

export const uploadToS3 = async (file, folder) => {
  const key = `${folder}/${randomUUID()}${path.extname(file.name)}`;
  try {
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fs.createReadStream(file.tempFilePath),
      ContentType: file.mimetype,
    }));
  } finally {
    fs.unlink(file.tempFilePath, () => {});
  }
  return `${publicUrl()}/${key}`;
};

// Only deletes objects we uploaded; seed data paths like /songs/1.mp3 are skipped
export const deleteFromS3 = async (url) => {
  const base = `${publicUrl()}/`;
  if (!url?.startsWith(base)) return;
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: url.slice(base.length) }));
  } catch (error) {
    console.log("Error deleting from S3", error);
  }
};
