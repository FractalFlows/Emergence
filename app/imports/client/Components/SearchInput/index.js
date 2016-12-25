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

export default class Modal extends React.Component {
  constructor() {
    super()
    this.state = {
      isSearching: false,
      isFocused: false,
      isLoading: false,
    }
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
            onInput={this._search.bind(this)}
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
              visibility: this.state.isSearching ? 'visible' : 'hidden',
              cursor: 'pointer',
              height: 25,
              padding: 5,
            }}
            onClick={this._clearSearch.bind(this)}
          />
        </SearchInputWrapper>

        <div
          style={{
            backgroundColor: '#FFF',
            width: '100%',
            position: 'absolute',
            top: '100%',
          }}
        >
        </div>
      </div>
    )
  }
  _search() {
    const search = ReactDOM.findDOMNode(this.refs.searchInput).value

    this.setState({ isSearching: !!search })

    if (search) {
      this.setState({ isLoading: true })

      Meteor.setTimeout(() => {
        this.setState({ isLoading: false })
      }, 1700)
    }
  }
  _clearSearch() {
    ReactDOM.findDOMNode(this.refs.searchInput).value = ''
    this._search()
  }
  _searchFocus() {
    this.setState({ isFocused: true })
  }
  _searchBlur() {
    this.setState({ isFocused: false })
  }
}
