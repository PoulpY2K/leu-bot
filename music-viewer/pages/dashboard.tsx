import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { MutableRefObject, useEffect, useState } from 'react'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import YoutubeCard from '../components/dashboard/youtube-card'

interface currentTrack {
  title: string
  shortUrl: string
  author: {
    name: string
    url: string
    channelID: string
  }
  bestThumbnail: {
    url: string | null
    width: number
    height: number
  }
  duration: string | null
}

const Dashboard = (props: {
  socketRef: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>
  isConnected: boolean
}) => {
  const [currentTrack, setCurrentTrack] = useState<currentTrack>()

  useEffect(() => {
    if (props.isConnected) {
      props.socketRef.current.emit('GET_TRACK', '861596038066733156')
      const interval = setInterval(() => {
        props.socketRef.current.emit('GET_TRACK', '861596038066733156')
      }, 5000)

      props.socketRef.current.on('TRACK', (track: currentTrack) => {
        setCurrentTrack(track)
      })
    }
  }, [props.isConnected])

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      backgroundColor="discord.200"
      alignItems="center"
      color="white"
    >
      <Stack direction="column">
        {props.isConnected ? (
          currentTrack ? (
            <YoutubeCard currentTrack={currentTrack!}></YoutubeCard>
          ) : (
            <Text>Aucun son en cours</Text>
          )
        ) : (
          <Text>Vous n'êtes pas connecté</Text>
        )}
      </Stack>
    </Flex>
  )
}

export default Dashboard
