import axios,{ AxiosResponse, AxiosStatic }  from 'axios';
import { Fragment, useState } from 'react';
import Router from 'next/router'

interface requestProps{
  url: string;
  method: string;
  body: any;
  onSuccess(prop: any):void
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

  const {url,method,body, onSuccess} = props;

  const [errors,setErrors] = useState<any | null>(null);

  const doRequest = async() => {
    try {
      const res: AxiosResponse = await axios[method](url,body);
      
      if(onSuccess){
        onSuccess(res.data)
      }

      return res.data;
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

export { useRequest };
export type { requestProps };
