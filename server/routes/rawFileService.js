import { S3Client, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET;

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const objectKey = `bulk-data/${url}`;
  console.log(`Checking S3 for: ${objectKey}`);

  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey }));
    console.log(`File found in S3: ${objectKey}`);
  } catch (error) {
    console.error(`File not found in S3: ${objectKey}`, error);
    return res.status(404).json({ error: `File '${objectKey}' not found in S3.` });
  }

  try {
    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey }),
      { expiresIn: 3600 }
    );
    console.log(`Signed URL generated: ${signedUrl}`);
    res.json({ download_url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Error generating download link." });
  }
});

export default router;
