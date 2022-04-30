import { ChakraProvider } from '@chakra-ui/provider'
import { AppProps } from 'next/app'
import { io } from 'socket.io-client'

import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'

import theme from '../theme/theme'
import { GetStaticProps } from 'next'

const socket = io('ws://localhost:4200')

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <Component {...pageProps} key={router.route} websocket={socket} />
      </Layout>
    </ChakraProvider>
  )
}

export default App
