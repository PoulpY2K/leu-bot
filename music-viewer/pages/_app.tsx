import { ChakraProvider } from '@chakra-ui/provider'
import { AppProps } from 'next/app'
import { io, Socket } from 'socket.io-client'

import Main from '../components/layouts/main'
import Fonts from '../components/fonts'

import theme from '../theme/theme'
import { useState, useEffect, useRef } from 'react'

const App = ({ Component, pageProps, router }: AppProps) => {
  const [socket] = useState<Socket>(io('http://localhost:4200'))
  const socketRef = useRef(socket)

  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    socketRef.current.on('connect', () => {
      setIsConnected(true)
    })

    socketRef.current.on('disconnect', () => {
      setIsConnected(false)
    })
  }, [isConnected])

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Main router={router}>
        <Component
          {...pageProps}
          key={router.route}
          props={{ socketRef, isConnected }}
          socketRef={socketRef}
          isConnected={isConnected}
        />
      </Main>
    </ChakraProvider>
  )
}

export default App
