export interface ResponseState<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ErrorState {
  message: string;
  redirect?: {
    destination: string;
    permanent: boolean;
  };
}
