import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import { Fragment } from 'react'
import Header from '../components/header'

interface User{
  email: string,
  password: string
}
interface AppPropsExtension extends AppProps {
  user?: User
}

const App = ({ Component, pageProps, user }: AppPropsExtension ) => {
  return (
    <Fragment>
      <Header currentUser={user} />
      <Component {...pageProps} />
    </Fragment>
  )
}

App.getInitialProps = async (context: AppContext) => {
  const { ctx } = context
  const client = buildClient(ctx)
  const { data } = await client.get('/api/users/currentuser')
  let pageProps = {}
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx)
  }
  return { pageProps, user: data.currentUser }
}

export default App
