import { Flex, Stack, Box } from '@chakra-ui/react'
import Header from '../components/layouts/header'
import Title from '../components/layouts/title'
import { Socket } from 'socket.io'
import MadeBy from '../components/made-by'
import ProgressBar from '../components/progress-bar'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'

const Page = (props: { websocket: Socket }) => {
  const [progress, setProgress]: [number, Dispatch<SetStateAction<number>>] =
    useState(0)

  const socket = props.websocket

  useEffect(() => {
    const delay: number = 15
    let counter = 0

    socket.on('connect', () => {
      console.log(socket.id)
    })

    const interval = setInterval(() => {
      counter++
      setProgress(counter)
      if (counter == 100) {
        clearInterval(interval)
      }
    }, delay)
  }, [])

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      backgroundColor="#36393f"
      alignItems="center"
    >
      <Stack direction="column">
        <Header></Header>
        <Title></Title>
        <Stack direction="column" spacing="15vh">
          <MadeBy></MadeBy>
          <Box>
            <ProgressBar progress={progress}></ProgressBar>
          </Box>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Page
