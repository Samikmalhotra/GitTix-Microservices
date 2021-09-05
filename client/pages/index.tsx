import { NextPage } from 'next'
import React from 'react'
import { AxiosResponse } from 'axios'
import buildClient from '../api/build-client'

interface Props {
  currentUser?: object | null
}

const LandingPage: NextPage<Props> = ({currentUser}: any) => {
  return currentUser ? <h1>You are Signed in</h1> : <h1>You are not signed in</h1>
}

LandingPage.getInitialProps = async (context) => {
    const {data}: AxiosResponse = await buildClient(context).get('/api/users/currentuser')
    return data;
}

export default LandingPage
