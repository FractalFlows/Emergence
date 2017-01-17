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
import { debounce } from 'lodash'

//Components
import ArticleItem from './article_item'

//Styled Components
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

export default class Modal extends React.Component {
  constructor() {
    super()
    this.state = {
      isFocused: false,
      isLoading: false,
      searchText: '',
      searchResults: [],
      showDropdown: false,
    }

    this.search = debounce(() => this._search(), 1000)
  }
  render() {
    return (
      <div
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <SearchInputWrapper
          ref="searchInputWrapper"
          className={this.state.isFocused ? 'focus' : ''}
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
            ref="searchInput"
            onInput={this.search}
            onKeyDown={this._searchSelect.bind(this)}
            onClick={this._searchFocus.bind(this)}
            onFocus={this._searchFocus.bind(this)}
            onBlur={this._searchBlur.bind(this)}
          />
          <CircularProgress
            size={17}
            thickness={2}
            color={cyan500}
            style={{
              visibility: this.state.isLoading ? 'visible' : 'hidden',
              marginRight: 7,
            }}
          />
          <CloseIcon
            color={grey500}
            style={{
              visibility: this.state.searchText ? 'visible' : 'hidden',
              cursor: 'pointer',
              height: 25,
              padding: 5,
            }}
            onClick={this._clearSearch.bind(this)}
          />
        </SearchInputWrapper>

        <ResultsDropdown
          className="dropdown-article-list"
          style={{
            display: this.state.showDropdown ? 'block' : 'none',
          }}
        >
          {this.state.searchResults.map(
            result => <ArticleItem
              key={result.DOI}
              info={result}
              searchText={this.state.searchText}
            />
          )}
        </ResultsDropdown>
      </div>
    )
  }
  _search() {
    const searchText = ReactDOM.findDOMNode(this.refs.searchInput).value
    const results = this.props.results

    this.setState({ searchText })

    if (searchText) {
      this.setState({ isLoading: true })

      //Simulating data fetching
      Meteor.call('article/search', { searchText }, (error, results) => {
        this.setState({
          isLoading: false,
          showDropdown: true,
          searchResults: results,
        })
      })
    } else {
      this.setState({
        showDropdown: false,
        searchResults: [],
      })
    }
  }
  _clearSearch() {
    const searchInput = ReactDOM.findDOMNode(this.refs.searchInput)

    searchInput.value = ''
    searchInput.focus()

    this.search()
  }
  _searchSelect({ which: key }) {
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
  _searchFocus() {
    this.setState({
      isFocused: true,
      showDropdown: true,
    })
  }
  _searchBlur(event) {
    Meteor.setTimeout(() => {
      const isBlurred =
        !ReactDOM.findDOMNode(this.refs.searchInput).matches(':focus')

      if (isBlurred) {
         this.setState({
          isFocused: false,
          showDropdown: false,
        })
      }
    }, 150)
  }
}
