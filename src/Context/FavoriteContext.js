import React from 'react'

const FavoriteContext = React.createContext({
  favoriteList: [],
  onToggleFavoriteLike: () => {},
})

export default FavoriteContext
