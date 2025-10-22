export type BaseResponse = {
  success: boolean;
  message?: string;
  data?: object;
  redirect?: {
    destination: string;
    permanent: boolean;
  };
};
