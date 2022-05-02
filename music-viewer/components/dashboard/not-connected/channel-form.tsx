import { ArrowForwardIcon } from '@chakra-ui/icons'
import { ChangeEvent } from 'react'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Text
} from '@chakra-ui/react'

const ChannelInputForm = ({
  isError,
  isChanged,
  isLoading,
  canAccess,
  onChange,
  onClick,
  value
}: {
  isError: boolean
  isChanged: boolean
  isLoading: boolean
  canAccess: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  value: string
}) => {
  return (
    <FormControl
      isInvalid={isError && isChanged}
      isRequired
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Flex direction="column" mb="5">
        <FormLabel htmlFor="channelId">ID du salon Discord</FormLabel>
        <Input
          id="channelId"
          placeholder="Identifiant du salon"
          value={value}
          onChange={onChange}
          w="35vw"
        />
        {!isError || !isChanged ? (
          <FormHelperText>
            Copiez l'identifiant du salon Discord et collez-le ici.
          </FormHelperText>
        ) : (
          <FormErrorMessage>
            L'identifiant du salon est requis.
          </FormErrorMessage>
        )}
      </Flex>
      <Flex justifyContent="center">
        <Button
          isLoading={isLoading}
          size="lg"
          fontWeight="bold"
          color="white"
          _focus={{
            outlineColor: 'discord.700'
          }}
          colorScheme="discord-logo"
          variant="solid"
          onClick={onClick}
          rightIcon={<ArrowForwardIcon />}
        >
          Connecter le bot
        </Button>
      </Flex>
      {!canAccess && value == '' ? (
        <Text
          overflowWrap="break-word"
          w="50vw"
          textAlign="center"
          mt="10"
          bgColor="discord.100"
          borderRadius="xl"
          p="5"
          color="red.500"
        >
          Impossible de se connecter. Vérifiez que l'identifiant est valide.
        </Text>
      ) : (
        <></>
      )}
    </FormControl>
  )
}

export default ChannelInputForm
