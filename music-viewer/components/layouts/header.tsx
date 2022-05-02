import { Box, Flex, Button } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box position="fixed" minW="100vw" marginTop="4">
      <Flex justifyContent="right">
        {/* <Button
          marginRight="4"
          variant="header"
          size="lg"
          _hover={{ backgroundColor: 'rgba(130, 170, 200, 0.5)' }}
        >
          Informations
        </Button>
        <Button
          marginRight="4"
          variant="header"
          size="lg"
          _hover={{ backgroundColor: 'rgba(130, 170, 200, 0.5)' }}
        >
          Planning
        </Button> */}
      </Flex>
    </Box>
  )
}

export default Header
