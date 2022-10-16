import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'

import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {displayNavbar: false}

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')

    Cookies.remove('jwt_token')
  }

  onClickCrossIcon = () => {
    this.setState({displayNavbar: false})
  }

  onClickMainMenu = () => {
    this.setState(prevState => ({
      displayNavbar: !prevState.displayNavbar,
    }))
  }

  render() {
    const {home, shelves, favorite} = this.props
    const selectHome = home ? 'link' : ''
    const selectBookshelves = shelves ? 'link' : ''
    const selectMyFavorites = favorite ? 'link' : ''
    const {displayNavbar} = this.state

    return (
      <div>
        <div className="nav-header">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dfq2ne340/image/upload/v1665469300/samples/Group_7731logo-2_hvl9gv.png"
                alt="website logo"
              />
            </Link>
          </div>

          <ul className="tabs-container">
            <Link to="/" className="list-item-bookShelves-tab">
              <li className={` ${selectHome}`}>Home</li>
            </Link>
            <Link to="/shelf" className="list-item-bookShelves-tab">
              <li className={` ${selectBookshelves}`}>Bookshelves</li>
            </Link>
            <Link to="/favorite" className="list-item-bookShelves-tab">
              <li className={` ${selectMyFavorites}`}>MyFavorites</li>
            </Link>
            <li className="nav-list-item">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-menu-mobile-responsive-container">
          <div className="nav-menu-list-header-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dfq2ne340/image/upload/v1665469300/samples/Group_7731logo-2_hvl9gv.png"
                alt="website logo"
                className="nav-bar-img-logo"
              />
            </Link>
            <button
              type="button"
              className="cross-icon"
              onClick={this.onClickMainMenu}
            >
              <FiMenu className="menu-icon" />
            </button>
          </div>

          {displayNavbar && (
            <>
              <div className="navbar-header-container">
                <Link to="/" className="link">
                  <h1 className={`home-tab ${selectHome}`}>Home</h1>
                </Link>

                <Link to="/shelf" className="link">
                  <h1 className={`book-shelves-tab ${selectBookshelves}`}>
                    Bookshelves
                  </h1>
                </Link>

                <Link to="/favorite" className="link">
                  <h1 className={`book-shelves-tab ${selectMyFavorites}`}>
                    MyFavorite
                  </h1>
                </Link>
              </div>

              <div className="navbar-header-container">
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>

                <button
                  type="button"
                  className="cross-icon"
                  onClick={this.onClickCrossIcon}
                >
                  <RiCloseCircleFill className="cross-icon" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
