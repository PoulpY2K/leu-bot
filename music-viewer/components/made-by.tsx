import { Code, Flex } from '@chakra-ui/react'

const MadeBy = () => {
  return (
    <Flex justifyContent="center">
      <Code
        size="xl"
        px="4"
        colorScheme="whiteAlpha"
        variant="solid"
        children="Made with ❤️ by Jérémy Laurent"
      />
    </Flex>
  )
}

export default MadeBy
