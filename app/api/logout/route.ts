"use server";

import { cookies } from "next/headers";
import axios from "axios";
import type { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    cookies().delete("token");

    return NextResponse.json({ data: "Logout Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
