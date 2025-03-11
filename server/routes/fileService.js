import { S3Client, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import dotenv from "dotenv";

dotenv.config();  // Ensure .env is loaded

const router = express.Router();

// AWS S3 Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET;

// Handle file download request
router.get("/", async (req, res) => {
  const { category, cycle, dataset, filetype } = req.query;

  if (!category || !cycle || !dataset || !filetype) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  let filename = `campaign-finance/today_${dataset}_${cycle}.${filetype}`;
  console.log(`🔍 Requesting file from S3: Bucket=${BUCKET_NAME}, Key=${filename}`);

  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: filename }));
    console.log(`✅ File found in S3: ${filename}`);
  } catch (error) {
    console.error(`❌ File not found in S3: ${filename}`, error);
    return res.status(404).json({ error: `File '${filename}' not found in S3.` });
  }

  try {
    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: filename }),
      { expiresIn: 3600 }
    );

    console.log("🔗 Generated signed URL:", signedUrl);
    res.json({ download_url: signedUrl });
  } catch (error) {
    console.error("❌ Error generating signed URL:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
