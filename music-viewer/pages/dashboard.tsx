import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { Router, withRouter } from 'next/router'
import { ChangeEvent, MutableRefObject, useEffect, useState } from 'react'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import NoSongCard from '../components/dashboard/no-song/no-song-card'
import ChannelInputForm from '../components/dashboard/not-connected/channel-form'
import NotConnectedCard from '../components/dashboard/not-connected/not-connected-card'
import YoutubeCard from '../components/dashboard/youtube/youtube-card'
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
  const [channelId, setChannelId] = useState<string>('')
  const [channelName, setChannelName] = useState<string>('')

  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isError = channelId === ''

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true)
    setChannelId(e.target.value)
  }

  // Sends channel ID in order to check if exists before connection
  const onClick = () => {
    if (channelId != '' && channelId != null) {
      setIsLoading(true)
      props.socketRef.current.emit('CHECK_CHANNEL', channelId)
    }
    setIsChanged(true)
  }

  useEffect(() => {
    if (props.isConnected) {
      // Receives channelID of the already connected bot
      props.socketRef.current.on('CHANNEL', (name: string) => {
        if (name && channelId.length == 0) {
          setChannelName(name)
          setIsConnected(true)
          setIsLoading(false)
        } else if (name && channelId != '' && channelId != null) {
          props.socketRef.current.emit('CONNECT_VOICE', {
            guildId: router.query.guildId,
            channelId: channelId
          })
        } else {
          setChannelName('')
          setIsConnected(false)
          setIsLoading(false)
        }
      })

      // Does changes if voice is connected
      props.socketRef.current.on('VOICE_CONNECTED', (name: string) => {
        if (name) {
          setChannelName(name)
          setIsConnected(true)
          setIsLoading(false)
        }
      })

      // If we finally have a valid channel name after connection, then get track
      if (channelName != '' && channelName != null) {
        props.socketRef.current.emit('GET_TRACK', router.query.guildId)
        setInterval(() => {
          props.socketRef.current.emit('GET_TRACK', router.query.guildId)
        }, 1000)

        props.socketRef.current.on('TRACK', (track: CurrentTrack) => {
          setCurrentTrack(track)
        })
      }
    }
  }, [isLoading, channelName])

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
            <YoutubeCard
              currentTrack={currentTrack!}
              channelName={channelName}
            />
          ) : isConnected ? (
            <NoSongCard channelName={channelName} />
          ) : (
            <Stack justifyContent="center" direction="column">
              <NotConnectedCard />
              <ChannelInputForm
                value={channelId}
                onChange={onChange}
                onClick={onClick}
                canAccess={!isConnected}
                isChanged={isChanged}
                isError={isError}
                isLoading={isLoading}
              />
            </Stack>
          )
        ) : (
          <Text>Vous n'êtes pas connecté</Text>
        )}
      </Stack>
    </Flex>
  )
}

export default withRouter(Dashboard)
