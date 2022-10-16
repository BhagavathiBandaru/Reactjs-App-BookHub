import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsFillHeartFill} from 'react-icons/bs'

import FavoriteContext from '../../Context/FavoriteContext'
import FooterSection from '../FooterSection'
import Header from '../Header'

import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetailsRoute extends Component {
  state = {
    bookDetailsDataList: {},
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getBookDetailsApiData()
  }

  getBookDetailsApiData = async () => {
    this.setState({
      apiStatus: apiConstantStatus.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookDetailsDataApiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(bookDetailsDataApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        bookDetails: {
          id: fetchedData.book_details.id,
          authorName: fetchedData.book_details.author_name,
          coverPic: fetchedData.book_details.cover_pic,
          aboutBook: fetchedData.book_details.about_book,
          rating: fetchedData.book_details.rating,
          aboutAuthor: fetchedData.book_details.about_author,
          readStatus: fetchedData.book_details.read_status,
        },
      }
      this.setState({
        bookDetailsDataList: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getBookDetailsApiData()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0867" height={50} width={50} />{' '}
    </div>
  )

  renderFailureView = () => (
    <div className="failure-page">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/dfq2ne340/image/upload/v1665490876/Group_7522something-went_rrtfrk.png"
        alt="failure view"
      />
      <p className="failure-heading">Something Went wrong.Please try again.</p>
      <button className="failure-btn" onClick={this.onClickRetry} type="button">
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {bookDetailsDataList} = this.state
    const {bookDetails} = bookDetailsDataList
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
      title,
      id,
    } = bookDetails

    return (
      <div className="book-details-card">
        <div className="book-details-container">
          <img alt="title" src={coverPic} className="cover-pic" />
          <div className="book-details-alignment">
            <h1 className="book-title" key="title">
              {title}
            </h1>
            <h1 className="book-title" key="title">
              {authorName}
            </h1>
            <div className="rating-container">
              <p className="avg-text avg-text">Avg Rating</p>
              <BsFillStarFill className="star" />
              <p> {rating} </p>
            </div>
            <p className="status-heading">
              Status: <span className="status-data"> {readStatus}</span>
            </p>

            <FavoriteContext.Consumer>
              {value => {
                const {favoriteList, onToggleFavoriteLike} = value
                const isChecked = favoriteList.find(
                  eachItem => eachItem.id === id,
                )
                const onChangeFavorite = () => {
                  onToggleFavoriteLike({
                    authorName,
                    coverPic,
                    rating,
                    readStatus,
                    aboutAuthor,
                    title,
                    id,
                  })
                }

                return (
                  <>
                    <input
                      className="input-element"
                      onChange={onChangeFavorite}
                      id={id}
                      type="checkbox"
                    />
                    <label htmlFor={id}>
                      <div className="favorite-container">
                        <p className="fav-heading">MyFavorite</p>
                        {isChecked ? (
                          <BsFillHeartFill className="favorite-icon-activated" />
                        ) : (
                          <BsFillHeartFill className="favorite-icon " />
                        )}
                      </div>
                    </label>
                  </>
                )
              }}
            </FavoriteContext.Consumer>
          </div>
        </div>

        <div className="author-book-details-container">
          <hr />
          <div>
            <h1 className="about-author"> About Author </h1>
            <p className="about-paragraph"> {aboutAuthor} </p>
          </div>
          <div>
            <h1 className="about-author"> About Book </h1>
            <p className="about-paragraph"> {aboutBook} </p>
          </div>
        </div>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return <> {this.renderSuccessView()} </>
      case apiConstantStatus.inProgress:
        return <> {this.renderLoadingView()} </>
      case apiConstantStatus.failure:
        return <> {this.renderFailureView()} </>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header shelves />
        <div className="book-details-route-container">
          {this.renderApiStatus()}
        </div>
        <FooterSection />
      </>
    )
  }
}

export default BookDetailsRoute
