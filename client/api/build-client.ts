import axios from 'axios';
import { NextPageContext } from 'next';

const buildClient = (context: NextPageContext) => {
  if (typeof window === 'undefined') {
    // server
    const serverUrl: string = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
    return axios.create({
      baseURL: serverUrl,
      headers: context?.req?.headers,
    });
  } else {
    // client
    return axios.create({
      baseURL: '/',
    });
  }
}

export default buildClient;