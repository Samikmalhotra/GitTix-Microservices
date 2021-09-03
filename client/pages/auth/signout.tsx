import React, {useEffect} from 'react'
import { useRequest, RequestProps } from '../../hooks/use-request'
import { useRouter } from 'next/router'

const Signout = () => {
  const router = useRouter()

  const requestProps: RequestProps = {
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: ()=> router.push('/')
  }
  const { doRequest, errors } = useRequest(requestProps);


  useEffect(() => {
    doRequest()
  }, [doRequest])
  return (
    <div>
      Signing you out...
    </div>
  )
}

export default Signout
