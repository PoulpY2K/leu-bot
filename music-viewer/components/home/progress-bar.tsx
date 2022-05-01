import { Progress, Stack, Text, Box } from '@chakra-ui/react'

const ProgressBar = (props: { progress: number }) => {
  return (
    <Box>
      <Stack textAlign="center" direction="column" spacing="2vh">
        <Progress
          value={props.progress}
          borderRadius="full"
          size="lg"
          hasStripe
          isAnimated
        />
        <Text color="white" fontWeight="extrabold">
          LOADING... {props.progress}%
        </Text>
      </Stack>
    </Box>
  )
}

export default ProgressBar
