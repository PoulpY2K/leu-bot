import { extendTheme } from '@chakra-ui/react'

// Adding colors
import colors from './colors';

// Global style overrides
import styles from './styles'

// App config overrides
import config from './config'

// Fonts set to components
import fonts from './foundations/fonts'

// Component style overrides
import Link from './components/link'
import Button from './components/button'
import Code from './components/code'

const overrides = {
  config,
  colors,
  styles,
  components: {
    Link: Link,
    Code: Code
    // Button: Button
  },
  fonts
}

export default extendTheme(overrides)
