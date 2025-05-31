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
const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:1337";
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN; 

router.get("/", async (req, res) => {
  const { category, cycle, dataset, filetype } = req.query;

  if (!category || !cycle || !dataset || !filetype) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const sourceFilename = `campaign-finance/${cycle}/${dataset}_${cycle}.parquet`;
  console.log(`Checking file in S3: ${sourceFilename}`);

  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: sourceFilename }));
    console.log(`✓ Source file found in S3: ${sourceFilename}`);
  } catch (error) {
    console.error(`✗ Source file missing in S3: ${sourceFilename}`, error);
    return res.status(404).json({ error: `Source file '${sourceFilename}' not found in S3.` });
  }

  if (filetype === "parquet") {
    const cloudfrontUrl = `https://${CLOUDFRONT_DOMAIN}/${sourceFilename}?nocache=${Date.now()}-${Math.random().toString(36).slice(2)}`;

    console.log("Returning CloudFront URL:", cloudfrontUrl);
    res.json({ download_url: cloudfrontUrl });

  } else if (filetype === "csv" || filetype === "xlsx") {
    const fastapiUrl = `${FASTAPI_URL}/convert?dataset_name=${dataset}&cycle=${cycle}&filetype=${filetype}`;
    console.log(`Redirecting user to FastAPI: ${fastapiUrl}`);
    res.json({ redirect_url: fastapiUrl });

  } else {
    res.status(400).json({ error: "Invalid filetype. Only 'parquet', 'csv', or 'xlsx' are allowed." });
  }
});

export default router;
