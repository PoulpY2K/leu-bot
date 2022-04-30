import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Router } from 'next/router'

export const siteTitle = 'Lames Discord Universe'

const Main = ({
  children,
  router
}: {
  children: React.ReactNode
  router: Router
}) => {
  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@poulpy2k" />
        <meta name="twitter:creator" content="@poulpy2k" />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Découvrez l'univers du Lames Discord Universe"
        />
        <meta name="author" content="Jérémy Laurent" />
        <meta name="author" content="LDU" />
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container p={0} maxW="container.2xl">
        {children}
      </Container>
    </Box>
  )
}

export default Main
