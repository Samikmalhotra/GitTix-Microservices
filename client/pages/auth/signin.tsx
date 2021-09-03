import { useState } from 'react';
import axios from 'axios'
import {useRequest, requestProps} from '../../hooks/use-request'
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const [email,setEmail] = useState<string | null>('');
  const [password,setPassword] = useState<string | null>('');
  const requestProps: requestProps = {
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: ()=> router.push('/')
  }
  const {doRequest, errors} = useRequest(requestProps)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email,password);

    doRequest();
    
  }

  return (
  <form onSubmit={onSubmit}>
    <h1>Sign In</h1>
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
    </div>
    
      {errors}
                           
    <button type="submit" className="btn btn-primary">Sign In</button>
  </form>
  )
}

export default Signup