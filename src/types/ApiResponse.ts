export type ApiResponseProp = {
  success?: boolean;
  message: string | Array<string>;
  status?: number;
  data?: any;
  error?: any
};
