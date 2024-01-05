"use server";

import { cookies } from "next/headers";
import axios from "axios";
import type { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  //   const request = await req.json();
  const listing_date = req.nextUrl.searchParams.get("listing_date");

  try {
    const { data } = await axios.get(
      `https://recruitment-test.gltkdev.com/analytic/click?listing_date=${listing_date}`,
      {
        headers: {
          Authorization: "Bearer " + cookies().get("token")?.value,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.log(error.response.data);
    return NextResponse.json({ error: error.response.data }, { status: 500 });
  }
}
