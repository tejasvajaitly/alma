import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const resume = url.searchParams.get("resume");

    if (!resume) throw new Error("Resume is required");

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: resume,
    });

    const response = await s3Client.send(command);
    if (!response.Body) throw new Error("error in fetching resume");

    const stream = response.Body as Readable;
    const contentType = response.ContentType || "application/octet-stream";
    const contentLength = response.ContentLength?.toString();

    // Create headers
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    if (contentLength) headers.set("Content-Length", contentLength);
    headers.set("Content-Disposition", `inline; filename="${resume}"`);

    // Return the response with the stream and headers
    return new Response(stream as unknown as BodyInit, {
      headers: headers,
    });
  } catch (e) {
    console.error(e);
    return new Response("Error fetching resume", { status: 500 });
  }
}
