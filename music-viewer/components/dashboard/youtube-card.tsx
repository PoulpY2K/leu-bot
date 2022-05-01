import { Flex, Image, Text } from '@chakra-ui/react'

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

const YoutubeCard = (props: { currentTrack: currentTrack }) => {
  return (
    <Flex direction="column">
      <Image
        width={props.currentTrack.bestThumbnail.width!}
        height={props.currentTrack.bestThumbnail.height!}
        src={props.currentTrack.bestThumbnail.url!}
        alt="Thumbnail"
      />
      <Text>{props.currentTrack?.title}</Text>
    </Flex>
  )
}

export default YoutubeCard
