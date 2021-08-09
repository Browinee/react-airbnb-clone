import 'tailwindcss/tailwind.css'
import '../styles/global.css';
import ProgressBar from "@badrap/bar-of-progress";
import {useEffect} from "react";
import {useRouter} from "next/router";

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  delay: 100,
  className: "z-50",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', progress.start)
    router.events.on('routeChangeComplete', progress.finish)
    router.events.on('routeChangeError', progress.finish)
    return()=>{
      router.events.off('routeChangeStart', progress.start)
      router.events.off('routeChangeComplete', progress.finish)
      router.events.off('routeChangeError', progress.finish)
    }

  }, []);
  return <Component {...pageProps} />
}

export default MyApp
