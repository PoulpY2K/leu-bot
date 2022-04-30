import { Flex } from '@chakra-ui/react'
import Header from '../components/layouts/header'
import Title from '../components/layouts/title'

const Page = () => {
  return (
    <Flex minH="100vh" justifyContent="center" backgroundColor="black">
      <Header></Header>
      <Title></Title>
    </Flex>
  )
}

export default Page
