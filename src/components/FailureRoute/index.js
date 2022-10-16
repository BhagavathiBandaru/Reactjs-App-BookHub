import './index.css'

const FailureRoute = props => {
  const {onClickTryAgain} = props

  const onClickTryAginBtn = () => {
    onClickTryAgain()
  }
  return (
    <div className="failure-page">
      <img
        src="https://res.cloudinary.com/dfq2ne340/image/upload/v1665561714/error-page-not-found-vector-illustration-background-flat-cartoon-character-graphic-design-landing-page-error-page-not-found-vector-141347621_auwqpr.jpg"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button onClick={onClickTryAginBtn} className="button" type="button">
        Try Again
      </button>
    </div>
  )
}

export default FailureRoute
