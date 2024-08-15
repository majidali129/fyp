import { ApiResponseProp } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export const apiResponse = ({
  success = true,
  message,
  status = 200
}: ApiResponseProp) => {
  return NextResponse.json({ success, message }, { status });
};
