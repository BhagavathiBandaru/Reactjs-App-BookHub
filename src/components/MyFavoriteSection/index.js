import Header from '../Header'
import FavoriteContext from '../../Context/FavoriteContext'
import BookItem from '../BookItem'
import FooterSection from '../FooterSection'

import './index.css'

const MyFavoriteSection = props => {
  const onClickAddToFav = () => {
    const {history} = props
    history.push('/shelf')
  }
  return (
    <>
      <Header favorite />
      <FavoriteContext.Consumer>
        {value => {
          const {favoriteList} = value
          return (
            <div className="fav-books-section">
              <h1 className="book-heading">My Favorite Books</h1>
              {favoriteList.length === 0 ? (
                <div className="no-fav-section">
                  <img
                    className="no-fav-img"
                    src="https://media.istockphoto.com/vectors/no-item-found-vector-flat-icon-design-illustration-web-and-mobile-vector-id1357284048?b=1&k=20&m=1357284048&s=612x612&w=0&h=r-4SxQINAW1MJ4TtbuPYl7lfOmnF6GsY1nnHLLX-kuY="
                    alt="no favorite"
                  />
                  <p className="no-fav-heading">No Favorite Books</p>
                  <button
                    className="btn-style"
                    type="button"
                    onClick={onClickAddToFav}
                  >
                    Add Favorite
                  </button>
                </div>
              ) : (
                <ul className="fav-books-list">
                  {favoriteList.map(eachItem => (
                    <BookItem key={eachItem.id} bookDetails={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </FavoriteContext.Consumer>
      <FooterSection />
    </>
  )
}

export default MyFavoriteSection
