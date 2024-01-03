import axios from "axios";
import type { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  const request = await req.json();
  console.log({ request });
  try {
    const { data } = await axios.post(
      "https://recruitment-test.gltkdev.com/user",
      request
    );
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.response.data }, { status: 500 });
  }
}
