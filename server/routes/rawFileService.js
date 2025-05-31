import express from "express";
import dotenv from "dotenv";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

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
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN; 

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const objectKey = `bulk-data/${url}`;
  console.log(`Checking S3 for: ${objectKey}`);

  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: objectKey }));
    console.log(`✓ File found in S3: ${objectKey}`);
  } catch (error) {
    console.error(`✗ File not found in S3: ${objectKey}`, error);
    return res.status(404).json({ error: `File '${objectKey}' not found in S3.` });
  }

  const nonce = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const cloudfrontUrl = `https://${CLOUDFRONT_DOMAIN}/${objectKey}?nocache=${nonce}`;

  console.log(`Returning CloudFront URL: ${cloudfrontUrl}`);
  res.json({ download_url: cloudfrontUrl });
});

export default router;
