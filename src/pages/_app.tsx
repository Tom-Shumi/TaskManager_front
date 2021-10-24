import {AppProps} from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/styles/Common.css';
import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome-animation/css/font-awesome-animation.min.css';


const App = ({Component, pageProps}: AppProps) => (
    <Component {...pageProps} />
)

export default App;
