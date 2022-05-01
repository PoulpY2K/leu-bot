import { Button, Flex, Link } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const StartButton = () => {
  return (
    <Flex justifyContent="center">
      <NextLink href="/login" passHref>
        <Link>
          <Button
            size="lg"
            fontWeight="bold"
            color="white"
            _focus={{
              outlineColor: 'discord.700'
            }}
            leftIcon={<StarIcon />}
            colorScheme="discord-logo"
            variant="solid"
          >
            En avant la musique !
          </Button>
        </Link>
      </NextLink>
    </Flex>
  )
}

export default StartButton
