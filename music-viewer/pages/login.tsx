import { Flex } from '@chakra-ui/react'
import { Router, withRouter } from 'next/router'
import { MutableRefObject, useState, useEffect, ChangeEvent } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import InputForm from '../components/login/input-form'

const Login = ({
  props,
  router
}: {
  props: {
    socketRef: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>
    isConnected: boolean
  }
  router: Router
}) => {
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [canAccess, setCanAccess] = useState<boolean>(true)
  const [guildId, setGuildId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isError = guildId === ''

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true)
    setGuildId(e.target.value)
  }

  const onClick = () => {
    if (guildId != '' && guildId != null) {
      setIsLoading(true)
      props.socketRef.current.emit('CHECK_GUILD', guildId)
    }
    setIsChanged(true)
  }

  useEffect(() => {
    if (props.isConnected) {
      props.socketRef.current.on('GUILD', (guild: string) => {
        if (guildId && guild == guildId && props.isConnected) {
          setCanAccess(true)
          setIsLoading(false)
          router.push({
            pathname: '/dashboard',
            query: { guildId: guild }
          })
        } else {
          setIsLoading(false)
          setCanAccess(false)
          setGuildId('')
        }
      })
    }
  }, [isLoading])

  return (
    <Flex
      minH="100vh"
      backgroundColor="discord.200"
      color="white"
      justifyContent="center"
    >
      <InputForm
        value={guildId}
        onChange={onChange}
        onClick={onClick}
        canAccess={canAccess}
        isChanged={isChanged}
        isError={isError}
        isLoading={isLoading}
      />
    </Flex>
  )
}

export default withRouter(Login)
