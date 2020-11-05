import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import theme from '../components/_theme';

const App = (props:any) =>{
    const { Component, pageProps } = props;
    const apolloClient = useApollo(pageProps.initialApolloState);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
      }, []);

    return (
        <React.Fragment>
            <Head>
                <title>App | Productividad</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </ThemeProvider>
        </React.Fragment>
        
    )
}

export default App;
