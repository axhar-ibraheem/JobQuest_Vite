import axios from "axios";
import { useState} from "react";
const useHttp = () => {
    const [show, setShow] = useState(false)
  const httpRequest = async (
    url,
    method,
    data = null,
    onSuccess,
    onError
  ) => {
    setShow(true)
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
      });
      if (response.status === 200) {
        onSuccess(response.data);
      }
    } catch (error) {
      const { data } = error.response;
      onError(data.error.message);
    } finally {
       setShow(false)
    }
  };

  return [httpRequest, show];
};

export default useHttp;
