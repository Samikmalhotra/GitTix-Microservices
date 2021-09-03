import axios,{ AxiosStatic }  from 'axios';
import { useState } from 'react';

interface requestProps{
  url: string;
  method: string;
  body: any;
}

let axios: AxiosStatic | any

// declare global{
//   namespace axios{
//     interface AxiosStaticimport{
//       axios?: any
//     }
//   }
// }

const useRequest = (props:   requestProps) => {

  const {url,method,body} = props;

  const [errors,setErrors] = useState<any | null>(null);

  const doRequest = async() => {
    try {
      const res = await axios[method](url,body)
      return res.data
    } catch (error:any) {
      setErrors(
        error.response.data.errors
      )
    }
  };

  return {doRequest, errors};

}

export default useRequest