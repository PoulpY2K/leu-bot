import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  HStack,
  Spacer,
  Code
} from '@chakra-ui/react'
import CurrentTrack from '../../../model/socket/current-track'
import YoutubeEmbed from '../youtube/youtube-embed'

const fromMS = (duration: number): string => {
  const seconds = Math.floor((duration / 1e3) % 60)
  const minutes = Math.floor((duration / 6e4) % 60)
  const hours = Math.floor(duration / 36e5)
  const secondsPad = `${seconds}`.padStart(2, '0')
  const minutesPad = `${minutes}`.padStart(2, '0')
  const hoursPad = `${hours}`.padStart(2, '0')
  return `${hours ? `${hoursPad}:` : ''}${minutesPad}:${secondsPad}`
}

const YoutubeCard = (props: {
  currentTrack: CurrentTrack
  channelName: string
}) => {
  return (
    <Flex direction="row">
      <Box bgColor="red" width="0.5vw" borderLeftRadius="xl"></Box>
      <Stack direction="column" backgroundColor="discord.100" p="8" spacing="5">
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
        >
          <Box bgColor="discord.500" p="3" w="30vw" borderRadius="full">
            <Text>Écoute en cours dans le salon</Text>
            <Text fontWeight="bold">{props.channelName}</Text>
          </Box>
        </Flex>
        <Text fontWeight="extrabold" textAlign="center">
          {props.currentTrack?.title}
        </Text>
        <YoutubeEmbed
          embedId={props.currentTrack.id}
          width={props.currentTrack.bestThumbnail.width!}
          height={props.currentTrack.bestThumbnail.height!}
        ></YoutubeEmbed>
        <Flex direction="row" alignItems="center">
          <Text textAlign="left">
            {fromMS(props.currentTrack.playbackDuration) +
              ' / ' +
              props.currentTrack?.duration}
          </Text>
          <Spacer></Spacer>
          <Stack alignItems="center" direction="row">
            <Text textAlign="left">
              Demandé par {props.currentTrack.user.username}{' '}
            </Text>
            <Image
              width="10"
              borderRadius="full"
              src={props.currentTrack.user.displayAvatarURL}
            ></Image>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default YoutubeCard
