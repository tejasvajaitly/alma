import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/db/index";
import { leads } from "@/db/schemas/schemas";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

const uploadFileToS3 = async (file: Buffer, fileName: string) => {
  try {
    const fileBuffer = file;
    const key = uuidv4();
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: key,
      Body: fileBuffer,
    };

    const command = new PutObjectCommand(params);
    const uploadedFileRes = await s3Client.send(command);
    console.log("uploadedFileRes", uploadedFileRes);
    return key;
  } catch (e) {
    console.log("Error in uploading file to S3", e);
    throw new Error("Error in uploading file to S3");
  }
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resume = formData.get("resume");

    if (!resume) throw new Error("Resume is required");
    console.log("resume", resume);
    const buffer = Buffer.from(
      await (resume instanceof Blob
        ? resume.arrayBuffer()
        : new Response(resume).arrayBuffer())
    );
    const key = await uploadFileToS3(buffer, (resume as File).name);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const linkedinUrl = formData.get("linkedin") as string;
    const country = formData.get("country") as string;
    const visaTypes = (formData.getAll("visas") as string[]).join(",");
    const customerMessage = formData.get("help") as string;

    await db.insert(leads).values({
      id: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      linkedinUrl: linkedinUrl,
      resume: key,
      status: "Pending",
      country: country,
      visaType: visaTypes,
      customerMessage: customerMessage,
    });

    return Response.json({ data: key });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id) throw new Error("ID is required for update");
    if (!status) throw new Error("Status is required for update");

    const result = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id));

    if (result.rowsAffected === 0) {
      return Response.json(
        { error: "No record found with the given ID" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Status updated successfully" });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 400 });
  }
}
