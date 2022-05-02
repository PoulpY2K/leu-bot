import { InfoIcon } from '@chakra-ui/icons'
import { Box, Code, Flex, Spacer, Stack, Text } from '@chakra-ui/react'

const NoSongCard = ({ channelName }: { channelName: string }) => {
  return (
    <Flex direction="row" justifyContent="center" mb="5">
      <Box bgColor="green" width="0.5vw" borderLeftRadius="xl"></Box>
      <Stack
        direction="column"
        backgroundColor="discord.100"
        p="8"
        spacing="5"
        justifyContent="center"
        alignItems="center"
        w="50vw"
      >
        <InfoIcon boxSize={10} />
        <Text fontWeight="extrabold" textAlign="center">
          Aucune musique n'est en train d'être jouée
        </Text>
        <Box
          bgColor="discord.500"
          p="3"
          w="30vw"
          borderRadius="full"
          textAlign="center"
        >
          <Text>Le bot est connecté dans le salon</Text>
          <Text fontWeight="bold">{channelName}</Text>
        </Box>
      </Stack>
    </Flex>
  )
}

export default NoSongCard
