import { Center, Heading, Stack, Text } from '@chakra-ui/react'

const Title = () => {
  return (
    <Center flexDirection="column">
      <Heading
        as="h1"
        color="white"
        fontWeight={700}
        fontSize={{ base: '4xl', sm: '6xl', md: '8xl' }}
        textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        textAlign="center"
      >
        <Stack direction="column">
          <Text color="#7289DA">Discord</Text>
          <Text>Music Viewer</Text>
        </Stack>
      </Heading>
    </Center>
  )
}

export default Title
