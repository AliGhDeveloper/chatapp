import '../styles/globals.scss'
import Navbar from 'components/layout/navbar'
import StartUp from 'components/startup'
import ContextProvider from 'store/globalstore'
import ApolloP from 'apollo/apollo'

function MyApp({ Component, pageProps }) {
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
