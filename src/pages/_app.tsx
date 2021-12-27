import {AppProps} from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/Common.css';
import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome-animation/css/font-awesome-animation.min.css';
import { RecoilRoot } from "recoil";
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient }from 'components/util/ApolloClientUtil';


const App = ({Component, pageProps}: AppProps) => (
    <ApolloProvider client={apolloClient}>
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
    </ApolloProvider>
)

export default App;
