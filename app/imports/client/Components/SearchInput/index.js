/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import styled from 'styled-components'
import { CircularProgress } from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import {
  white,
  cyan500,
  grey100,
  grey200,
  grey400,
  grey500,
  grey800,
} from 'material-ui/styles/colors'

// Containers
import { redux as SearchContainer } from '/imports/client/Pages/Search/container'

// Components
import ArticleItem from './article_item'

// Styled Components
const SearchInputWrapper = styled.div`
  background-color: ${grey100};
  padding: 0 16px 0 10px;
  display: flex;
  alignItems: center;
  transition: .1s;

  &.focus {
    box-shadow: 0 1px 3px ${grey400};
    background-color: ${white};
  }
`
const SearchInput = styled.input`
  flex-grow: 99999;
  padding: 15px 15px;
  border: none;
  background-color: transparent;
  color: ${grey800};

	&:focus {
		outline: none;
	}
`

const ResultsDropdown = styled.div`
  background-color: #FFF;
  width: 100%;
  position: absolute;
  top: calc(100% + 1px);
  box-shadow: 0 1px 3px ${grey400};
  max-height: 500px;
  overflow-y: auto;
`

class SearchInputHolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdown: false,
    }
  }

  render() {
    const {
      searchState,
      clearSearch,
      fetchSelectedArticle,
    } = this.props
    const { showDropdown } = this.state

    return (
      <div
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <SearchInputWrapper
          ref="searchInputWrapper"
          className={showDropdown ? 'focus' : ''}
        >
          <SearchIcon
            color={grey500}
            style={{
              height: 25,
            }}
          />
          <SearchInput
            type="text"
            placeholder="Enter an article DOI, title, author or keywords"
            onInput={(event) => {
              const val = event.target.value
              if(!val){
                this.props.clearSearch()
              } else {
                this.props.fetchSearch({ searchText: val })
              } 
            }}
            onKeyDown={this._searchSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={searchState.isFetchingSelectedArticle}
            innerRef={ref => this.searchInputEl = ref}
          />
          <CircularProgress
            size={17}
            thickness={2}
            color={cyan500}
            style={{
              visibility: ( searchState.isSearching || searchState.isFetchingSelectedArticle )? 'visible' : 'hidden',
              marginRight: 7,
            }}
          />
          <CloseIcon
            color={grey500}
            style={{
              visibility: searchState.searchText ? 'visible' : 'hidden',
              cursor: 'pointer',
              height: 25,
              padding: 5,
            }}
            onClick={this.clearSearch.bind(this)}
          />
        </SearchInputWrapper>

        <ResultsDropdown
          className="dropdown-article-list"
          style={{
            display: showDropdown ? 'block' : 'none',
          }}
        >
          {
            searchState.articlesFromSearch.map(result => (
              <ArticleItem
                key={result.DOI}
                info={result}
                searchText={searchState.searchText}
                onClick={() => fetchSelectedArticle({ DOI: result.DOI, source: result.source })}
              />
            ))
          }
        </ResultsDropdown>
      </div>
    )
  }

  onBlur = (event) => {
    this.props.onBlur && this.props.onBlur(event)
    setTimeout(() => this.setState({ showDropdown: false }), 100)
  }

  onFocus = (event) => {
    this.props.onFocus && this.props.onFocus(event)
    this.setState({ showDropdown: true })
  }

  clearSearch(event) {
    this.searchInputEl.value = ''
    this.props.clearSearch()
    this.setState({ showDropdown: false })
  }

  _searchSelect = ({ which: key }) => {
    //Arrow Down
    if (key === 40) {
      const hoveredResult =
        document.querySelector('.dropdown-article-item:hover')

      if (hoveredResult) return

      const currentResultSelected =
        document.querySelector('.dropdown-article-item.hover')

      if (currentResultSelected) {
        const { nextSibling } = currentResultSelected

        if (nextSibling) {
          currentResultSelected.classList.remove('hover')
          nextSibling.classList.add('hover')
          document.querySelector('.dropdown-article-list')
            .scrollTop = nextSibling.offsetTop
        }
      } else {
        const firstResult =
          document.querySelector('.dropdown-article-item')

        if (firstResult) {
          firstResult.classList.add('hover')
          document.querySelector('.dropdown-article-list').scrollTop = 0
        }
      }

    //Arrow Up
    } else if (key === 38) {
      const currentResultSelected =
        document.querySelector('.dropdown-article-item.hover')

      if (currentResultSelected) {
        currentResultSelected.classList.remove('hover')

        const { previousSibling } = currentResultSelected

        if (previousSibling) {
          previousSibling.classList.add('hover')

          document.querySelector('.dropdown-article-list')
            .scrollTop = previousSibling.offsetTop
        }
      }

    //Enter
    } else if (key === 13) {
      const currentResultSelected =
        document.querySelector('.dropdown-article-item.hover a')

      if (currentResultSelected) {
        currentResultSelected.click()
        currentResultSelected.parentElement.classList.remove('hover')
        ReactDOM.findDOMNode(this.refs.searchInput).blur()
      } else if (!this.state.showDropdown) {
        this.setState({ showDropdown: true })
      }
    //Esc
    } else if (key === 27) {
      if (this.state.showDropdown) {
        this.setState({ showDropdown: false })
      } else {
        ReactDOM.findDOMNode(this.refs.searchInput).blur()
      }
    }
  }
}

export default SearchContainer(SearchInputHolder)
