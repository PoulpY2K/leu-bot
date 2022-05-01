import { Flex, Stack } from '@chakra-ui/react'
import Header from '../components/layouts/header'
import Title from '../components/home/title'
import { Socket } from 'socket.io'
import MadeBy from '../components/home/made-by'
import ProgressBar from '../components/home/progress-bar'
import { useState, useEffect, MutableRefObject } from 'react'
import StartButton from '../components/home/start-button'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const Index = (props: {
  socketRef: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>
  isConnected: boolean
}) => {
  const [progress, setProgress] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (props.isConnected) {
      const delay: number = 15
      let counter = 0

      const interval = setInterval(() => {
        counter++
        setProgress(counter)
        if (counter == 100) {
          setIsLoading(false)
          clearInterval(interval)
        }
      }, delay)
    }
  }, [props.isConnected, isLoading])

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      backgroundColor="discord.200"
      alignItems="center"
    >
      <Stack direction="column">
        <Header></Header>
        <Title></Title>
        <Stack direction="column" spacing="10vh">
          <MadeBy></MadeBy>
          {isLoading ? (
            <ProgressBar progress={progress}></ProgressBar>
          ) : (
            <StartButton></StartButton>
          )}
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Index
