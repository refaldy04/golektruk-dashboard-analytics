"use server";

import { cookies } from "next/headers";
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

  try {
    const { data } = await axios.post(
      "https://recruitment-test.gltkdev.com/login",
      request
    );
    cookies().set("token", data.access_token);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.log(error.response.data);
    return NextResponse.json({ error: error.response.data }, { status: 500 });
  }
}
