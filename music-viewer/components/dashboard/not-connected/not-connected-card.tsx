import { InfoIcon } from '@chakra-ui/icons'
import { Box, Code, Flex, Spacer, Stack, Text } from '@chakra-ui/react'

const NotConnectedCard = () => {
  return (
    <Flex direction="row" justifyContent="center" mb="5">
      <Box bgColor="cyan" width="0.5vw" borderLeftRadius="xl"></Box>
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
        <Text fontWeight="medium" textAlign="center">
          Lancez une musique sur votre serveur avec la commande{' '}
          <Code colorScheme="blue">/ldu play</Code> ou entrez l'identifiant de
          votre salon ci-dessous pour connecter le bot.
        </Text>
      </Stack>
    </Flex>
  )
}

export default NotConnectedCard
