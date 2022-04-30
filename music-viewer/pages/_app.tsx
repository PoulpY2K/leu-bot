import { ChakraProvider } from '@chakra-ui/provider'
import { AppProps } from 'next/app'

import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'

import theme from '../theme/theme'

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  )
}

export default App
