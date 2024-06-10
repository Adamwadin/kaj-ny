import { Helmet } from 'react-helmet';
import Movies from "./components/movies";
import GoogleMap from "./components/Googlemaps";
import "./App.css";
import Loginsession from "./components/loginsession";
import Contactform from "./components/Contactemail";



function App() {
  return (
    <>
       <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZS6T73EKC2"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZS6T73EKC2');
          `}
        </script>
      </Helmet>
      <Loginsession />
      <GoogleMap />
      <Contactform />
      <Movies />
    </>
  );
}

export default App;