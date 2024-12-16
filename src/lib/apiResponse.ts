import { ApiResponseProp } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export const apiResponse = ({
  success = true,
  message,
  status = 200,
  data,
  error,
}: ApiResponseProp) => {
  if (error) {
    return NextResponse.json(
      { success, message, data: null, error },
      { status }
    );
  } else {
    return NextResponse.json({ success, message, data }, { status });
  }
};
