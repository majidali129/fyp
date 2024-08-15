import { NextResponse } from "next/server";

type ApiResponseProp = {
  success?: boolean;
  message: string | Array<string>;
  status?: number;
};

export const apiResponse = ({
  success = true,
  message,
  status = 200
}: ApiResponseProp) => {
  return NextResponse.json({ success, message }, { status });
};
