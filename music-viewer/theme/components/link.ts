import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils'

const Link = {
  baseStyle: (props: Dict<any> | StyleFunctionProps) => ({
    color: mode('#ffffff', '#000000')(props),
    textUnderlineOffset: 3
  })
}

export default Link
