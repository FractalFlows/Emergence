/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import {
  grey100,
  grey200,
  grey500,
} from 'material-ui/styles/colors'

//Styled Components
const Input = styled.input`
  flex-grow: 99999;
  padding: 15px 10px;
  border: none;
  background-color: transparent;

	&:focus {
		outline: none;
	}
`

export default class Modal extends React.Component {
  constructor() {
    super()
    this.state = {
      isSearching: false,
    }
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: grey100,
          padding: '0 15px 0 10px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SearchIcon color={grey500} />
        <Input
          type="text"
          placeholder="Enter an article DOI, title, author or keywords"
          ref="searchInput"
          onInput={this._search.bind(this)}
        />
        <CloseIcon
          color={grey500}
          style={{
            visibility: this.state.isSearching ? 'visible' : 'hidden',
            cursor: 'pointer',
            height: 15,
            width: 15,
            backgroundColor: grey200,
            padding: 5,
            borderRadius: '50%',
          }}
          onClick={this._clearSearch.bind(this)}
        />
      </div>
    )
  }
  _search() {
    const search = ReactDOM.findDOMNode(this.refs.searchInput).value

    this.setState({ isSearching: !!search })
  }
  _clearSearch() {
    ReactDOM.findDOMNode(this.refs.searchInput).value = ''
    this._search()
  }
}
