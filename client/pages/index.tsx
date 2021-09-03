import { NextPage } from 'next'
import React from 'react'
import axios, { AxiosResponse } from 'axios'
import buildClient from '../api/build-client'

const LandingPage: NextPage = (props) => {
  console.log(props)
  return (
    <h1>Landing Page</h1>
  )
}

LandingPage.getInitialProps = async (context) => {
    const {data}: AxiosResponse = await buildClient(context).get('/api/users/currentuser')
    return data;
}

export default LandingPage
