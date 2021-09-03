import { NextPage } from 'next'
import React from 'react'
import axios, { AxiosResponse } from 'axios'

const LandingPage: NextPage = (props) => {
  console.log(props)
  return (
    <h1>Landing Page</h1>
  )
}

LandingPage.getInitialProps = async ({req}) => {
    if(typeof window === 'undefined') {
    // server side
    // request to ingress-nginx
    const {data}: AxiosResponse = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser', {
        headers: req?.headers
      }
    )
    return data;
  }else{
    // client side
    // request to client
    const {data}: AxiosResponse = await axios.get('/api/users/currentUser')
    return data
  }
}

export default LandingPage
