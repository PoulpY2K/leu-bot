import { Flex } from '@chakra-ui/react'

const YoutubeEmbed = ({
  embedId,
  width,
  height
}: {
  embedId: string
  width: number
  height: number
}) => (
  <Flex justifyContent="center">
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </Flex>
)

export default YoutubeEmbed
