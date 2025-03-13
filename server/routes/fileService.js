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

const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:1337"; 

router.get("/", async (req, res) => {
  const { category, cycle, dataset, filetype } = req.query;

  if (!category || !cycle || !dataset || !filetype) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const sourceFilename = `campaign-finance/${cycle}/${dataset}_${cycle}.parquet`;
  console.log(`🔍 Checking file in S3: ${sourceFilename}`);

  try {
      await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: sourceFilename }));
      console.log(`:) Source file found in S3: ${sourceFilename}`);
  } catch (error) {
      console.error(`WRONG. Source file missing in S3: ${sourceFilename}`, error);
      return res.status(404).json({ error: `Source file '${sourceFilename}' not found in S3.` });
  }

  if (filetype === "parquet") {
    try {
      const signedUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({ Bucket: BUCKET_NAME, Key: sourceFilename }),
        { expiresIn: 3600 }
      );

      console.log("🔗 Generated signed URL:", signedUrl);
      res.json({ download_url: signedUrl });
    } catch (error) {
        console.error("WRONG. Error generating signed URL:", error);
        res.status(500).json({ error: error.message });
    }
  } else if (filetype === "csv" || filetype === "xlsx") {
      const fastapiUrl = `${FASTAPI_URL}/convert?dataset_name=${dataset}&cycle=${cycle}&filetype=${filetype}`;
      console.log(`🔀 Redirecting user to FastAPI: ${fastapiUrl}`);
      res.json({ redirect_url: fastapiUrl });
  } else {
      res.status(400).json({ error: "Invalid filetype. Only 'parquet', 'csv', or 'xlsx' are allowed." });
  }
});

export default router;
