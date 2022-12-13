import '../styles/globals.scss'
import Navbar from 'components/layout/navbar'
import StartUp from 'components/startup'
import ContextProvider, { Context } from 'store/globalstore'
import ApolloP from 'apollo/apollo'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  
  if(Component.getLayout){
    return (
      <ApolloP>
      <ContextProvider >
        <StartUp>
          {
            Component.getLayout(<Component {...pageProps} />)
          }
        </StartUp>
      </ContextProvider>
    </ApolloP>
    )
  }
  return (
    <ApolloP>
      <ContextProvider>
        <StartUp >
          <Navbar />
              <Component {...pageProps} />
        </StartUp>
      </ContextProvider>
    </ApolloP>
  )
}

export default MyApp
