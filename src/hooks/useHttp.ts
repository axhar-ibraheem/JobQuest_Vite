import axios, { Method, AxiosError } from "axios";
import { useState } from "react";

type onSuccess<DATA> = (data: DATA) => void;
type onError = (message: string) => void;

const useHttp = () => {
  const [show, setShow] = useState<boolean>(false);

  const httpRequest = async <DATA>(
    url: string,
    method: Method,
    data: unknown,
    onSuccess: onSuccess<DATA>,
    onError: onError,
  ) => {
    setShow(true);
    try {
      const response = await axios<DATA>({
        method: method,
        url: url,
        data: data,
      });
      if (response.status === 200) {
        onSuccess(response.data);
      }
    } catch (err) {
      const error = err as AxiosError<{ error: { message: string } }>;
      const message =
        error.response?.data.error.message ?? "Something went wrong!";
      onError(message);
    } finally {
      setShow(false);
    }
  };

  return [httpRequest, show] as const;
};

export default useHttp;
