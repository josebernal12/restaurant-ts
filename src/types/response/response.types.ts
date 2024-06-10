export type ResponseType<T> = {
  error: boolean;
  data?: T[];
  token?: string
  message: string;
  status: number;
}


