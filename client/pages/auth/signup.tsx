import { useState } from 'react';
import axios from 'axios'

const Signup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email,password);
    
    const res = await axios.post('/api//users/signup', {
      email, password
    })

    console.log(res.data)
  }

  return (
  <form onSubmit={onSubmit}>
    <h1>SignUp</h1>
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  )
}

export default Signup