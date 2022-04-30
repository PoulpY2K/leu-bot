import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import styles from './styles'

// App config overrides
import config from './config'

// Fonts set to components
import fonts from './foundations/fonts'

// Component style overrides
import Link from './components/link'
import Button from './components/button'

const overrides = {
  config,
  styles,
  components: {
    Link: Link,
    // Button: Button
  },
  fonts
}

export default extendTheme(overrides)
