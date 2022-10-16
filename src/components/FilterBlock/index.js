import './index.css'

const FilterBlock = props => {
  const {filterBookData, getFilterBookDetails, isActive} = props
  const {id, label, value} = filterBookData
  const activateStatus = isActive && 'activate-status'

  const onClickReadStatusElement = () => {
    getFilterBookDetails(value, label, id)
  }
  return (
    <li className="bookshelves-list-items">
      <button
        onClick={onClickReadStatusElement}
        type="button"
        className={`list-item-btn-style ${activateStatus}`}
      >
        {label}
      </button>
    </li>
  )
}

export default FilterBlock
