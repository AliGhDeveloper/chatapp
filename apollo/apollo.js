import { InMemoryCache, ApolloProvider, ApolloClient, createHttpLink  } from "@apollo/client";

const link = createHttpLink( {
    uri : process.env.BASE_URL + '/graphql',
    
});

const client = new ApolloClient({
    link,
    cache : new InMemoryCache({
        addTypename : false
    })
});

export default function ApolloP({ children }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}