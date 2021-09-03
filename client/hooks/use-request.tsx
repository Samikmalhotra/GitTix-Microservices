import axios,{ AxiosStatic }  from 'axios';
import { Fragment, useState } from 'react';

interface requestProps{
  url: string;
  method: string;
  body: any;
}

// let axios: AxiosStatic | any

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
      console.log(res.data)
      return res.data
    } catch (error:any) {
      setErrors(
        <Fragment>
        {error.response.data.errors.map((err:any)=> {
          return(
          <div className="alert alert-danger" key={err.message}>
            {err && err.message}
            </div>  )})}
            </Fragment>
      )
    }
  };

  return {doRequest, errors};

}

export default useRequest