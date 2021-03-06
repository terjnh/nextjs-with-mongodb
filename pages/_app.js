import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </ChakraProvider>
  )
}

export default MyApp
