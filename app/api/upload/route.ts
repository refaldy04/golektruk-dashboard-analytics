import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const request = await req.formData();
    const file: File | null = request.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Lakukan permintaan POST ke endpoint eksternal
    const { data } = await axios.post(
      "https://recruitment-test.gltkdev.com/user/photo/upload",
      request
    );

    // Tanggapi dengan hasil dari permintaan eksternal
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error during POST request:", error);

    // Tanggapi dengan kesalahan jika terjadi masalah selama permintaan
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
