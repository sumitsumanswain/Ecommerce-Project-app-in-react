import {Header} from '../components/Header';
import './NotFoundPage.css'
export function NotFoundPage({cart}){
  return(
    <>
      <title>Not Found 404</title>
      <link rel="icon" type="img/svg+xml" href="home-favicon.png" />
      <Header cart={cart}/>
      <div className="not-found-page">
        This url is not found "404"
      </div>
    </>
  )
}