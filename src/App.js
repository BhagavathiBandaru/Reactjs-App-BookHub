import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import BookShelvesRoute from './components/BookShelvesRoute'
import MyFavoriteSection from './components/MyFavoriteSection'
import BookDetailsRoute from './components/BookDetailsRoute'
import FavoriteContext from './Context/FavoriteContext'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
console.log(bookshelvesList)

class App extends Component {
  state = {favoriteList: []}

  onToggleFavoriteLike = bookDetails => {
    const {favoriteList} = this.state
    const isAlreadyAdded = favoriteList.some(
      eachBook => eachBook.id === bookDetails.id,
    )
    if (isAlreadyAdded === true) {
      this.setState(prevState => ({
        favoriteList: prevState.favoriteList.filter(
          eachBook => eachBook.id !== bookDetails.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        favoriteList: [...prevState.favoriteList, bookDetails],
      }))
    }
  }

  render() {
    const {favoriteList} = this.state

    return (
      <FavoriteContext.Provider
        value={{
          favoriteList,
          onToggleFavoriteLike: this.onToggleFavoriteLike,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/shelf" component={BookShelvesRoute} />
          <ProtectedRoute
            exact
            path="/favorite"
            component={MyFavoriteSection}
          />
          <ProtectedRoute
            exact
            path="/books/:id"
            component={BookDetailsRoute}
          />
          <Route component={NotFoundRoute} />
        </Switch>
      </FavoriteContext.Provider>
    )
  }
}

export default App
