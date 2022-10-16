import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import FooterSection from '../FooterSection'

import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class HomeRoute extends Component {
  state = {apiStatus: apiConstantStatus.initial, topRatedBooks: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})

    const topRatedBooksApi = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const booksList = fetchedData.books
      const updatedData = booksList.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        apiStatus: apiConstantStatus.success,
        topRatedBooks: updatedData,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  renderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook
          const onClickedTopRatedBook = () => {
            const {history} = this.props
            history.push(`/books/${id}`)
          }

          return (
            <div key={id} className="top-rated-book-item-container">
              <button
                onClick={onClickedTopRatedBook}
                className="top-rated-card-btn"
                type="button"
              >
                <div className="book-image-details-container">
                  <img
                    className="cover-page-image"
                    src={coverPic}
                    alt={title}
                  />
                  <h1 className="title">{title}</h1>
                  <p className="name">{authorName}</p>
                </div>
              </button>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-page">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/dfq2ne340/image/upload/v1665490924/Vectordidnot-find_nvjwit.png"
        alt="failure view"
      />

      <p className="failure-heading">Something Went wrong. Please try again.</p>
      <button className="failure-btn" onClick={this.onClickRetry} type="button">
        Try Again
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return <>{this.renderSuccessView()}</>
      case apiConstantStatus.inProgress:
        return <>{this.renderLoaderView()}</>
      case apiConstantStatus.failure:
        return <> {this.renderFailureView()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header home />
        <div className="home-page-container-main-block">
          <h1 className="main-heading_top" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home-find-books-btn btn-sm"
            type="button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
          <div>
            <div className="home-container">
              <div className="heading-container">
                <h1 className="main-heading">Top Rated Books</h1>
                <button
                  className="home-find-books-btn  find-books-lg"
                  type="button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">{this.renderApiStatus()}</div>
            </div>
          </div>
        </div>
        <FooterSection />
      </>
    )
  }
}

export default HomeRoute
