import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { Router, withRouter } from 'next/router'
import { MutableRefObject, useEffect, useState } from 'react'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import YoutubeCard from '../components/dashboard/youtube-card'
import CurrentTrack from '../model/socket/current-track'

const Dashboard = ({
  props,
  router
}: {
  props: {
    socketRef: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>
    isConnected: boolean
  }
  router: Router
}) => {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack>()

  useEffect(() => {
    if (props.isConnected) {
      props.socketRef.current.emit('GET_TRACK', '861596038066733156')
      const interval = setInterval(() => {
        props.socketRef.current.emit('GET_TRACK', '861596038066733156')
      }, 1000)

      props.socketRef.current.on('TRACK', (track: CurrentTrack) => {
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

export default withRouter(Dashboard)
