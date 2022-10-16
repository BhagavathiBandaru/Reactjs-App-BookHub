import {Link, withRouter} from 'react-router-dom'

import './index.css'

const NotFoundRoute = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-page">
      <img
        src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?compress=1&resize=400x300&vertical=top"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="description">
        we are sorry, the page you requested could not be found, please go back
        to the homepage
      </p>
      <Link to="/">
        <button className="btn" type="button" onClick={onClickHomePage}>
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}
export default withRouter(NotFoundRoute)
