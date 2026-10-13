import {Header} from '../components/Header';
import './NotFoundPage.css'
export function NotFoundPage(){
  return(
    <>
      <title>Not Found 404</title>
      <link rel="icon" type="img/svg+xml" href="home-favicon.png" />
      <Header />
      <div className="not-found-page">
        This url is not found "404"
      </div>
    </>
  )
}