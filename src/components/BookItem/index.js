import {withRouter} from 'react-router-dom'

import {BsFillStarFill, BsFillHeartFill} from 'react-icons/bs'
import './index.css'
import FavoriteContext from '../../Context/FavoriteContext'

const BookItem = props => {
  const onClickBookItem = () => {
    const {bookDetails} = props
    const {id} = bookDetails
    const {history} = props
    history.push(`/books/${id}`)
  }

  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails
  return (
    <FavoriteContext.Consumer>
      {value => {
        const {onToggleFavoriteLike, favoriteList} = value
        const isChecked = favoriteList.find(eachBook => eachBook.id === id)

        const onChangeFavorite = () => {
          onToggleFavoriteLike(bookDetails)
        }
        return (
          <>
            <li className="books-list-display-container">
              <div className="book-item-btn">
                <button
                  className=" book-item-btn book-btn"
                  onClick={onClickBookItem}
                  type="button"
                >
                  <img
                    className="cover-page-img-element"
                    src={coverPic}
                    alt={title}
                  />
                </button>
              </div>
              <div className="Book-Details-Container">
                <h1 className="book-title"> {title}</h1>
                <p className="author-name"> {authorName}</p>
                <div className="rating-container">
                  <h1 className="avg-text">Avg Rating</h1>
                  <BsFillStarFill className="star" />
                  <p className="rating-data"> {rating}</p>
                </div>
                <div className="status-container">
                  <p className="status-heading">
                    Status: <span className="status-data"> {readStatus}</span>
                  </p>
                  <input
                    className="favorite-input"
                    onChange={onChangeFavorite}
                    id={id}
                    isChecked={isChecked}
                    type="checkbox"
                  />
                  <label htmlFor={id}>
                    <div className="favorite-container">
                      <p className="fav-heading">MyFavorite</p>
                      {isChecked ? (
                        <BsFillHeartFill className="favorite-icon-selected" />
                      ) : (
                        <BsFillHeartFill className="favorite-icon " />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </li>
          </>
        )
      }}
    </FavoriteContext.Consumer>
  )
}

export default withRouter(BookItem)
