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
`

export default class Modal extends React.Component {
  constructor() {
    super()
    this.state = {
      isSearching: false,
      isFocused: false,
      isLoading: false,
      searchText: '',
      searchResults: [],
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

        <ResultsDropdown
          style={{
            display: this.state.isFocused ? 'block' : 'none',
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
    const results = [
      {
        title: 'Engineering applications of correlation and spectral analysis',
        authors: ['Bendat, J. S.', 'Piersol, A. G.'],
        DOI: '10.1109/5.771073',
      },
      {
        title: 'Electrospinning of polymeric nanofibers for tissue engineering applications: a review',
        authors: ['Quynh P. Pham', 'Upma Sharma', 'Antonios G. Mikos'],
        DOI: '10.1109/FIE.2000.896576',
      },
      {
        title: 'Survey and critique of techniques for extracting rules from trained artificial neural networks',
        authors: ['Robert Andrews', 'Joachim Diederich', 'Alan B. Tickle'],
        DOI: '10.1109/IE.2014.75',
      },
      {
        title: 'Utility of multimaterial 3D printers in creating models with pathological entities to enhance the training experience of neurosurgeons',
        authors: ['Vicknes Waran', 'Vairavan Narayanan', 'Ravindran Karuppiah', 'Sarah L. F. Owen', 'Tipu Aziz'],
        DOI: '10.3171/2013.11.JNS131066',
      },
      {
        title: 'New Landscapes and New Eyes: The Role of Virtual World Design for Supply Chain Education',
        authors: ['Theo J. Bastiaens', 'Lincoln C. Wood', 'Torsten Reiners'],
        DOI: '10.1109/TC.2002.1009146',
      },
    ].filter(article => article.title.match(new RegExp(`(${searchText})`, 'gi')))

    results.map(article =>
      article.abstract = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet ligula a neque dapibus maximus sed eu velit. Donec mattis congue tellus quis condimentum. Aliquam pulvinar rutrum tortor a tempus. Duis maximus vel neque sit amet pellentesque. Maecenas tincidunt nisl id sapien iaculis iaculis. Sed aliquet id dolor gravida lobortis. Cras quam tellus, euismod sit amet quam eleifend, cursus lacinia mauris. Donec nec vulputate turpis, et malesuada eros. Nulla nec nulla non ante volutpat dignissim vitae a lorem. Vestibulum lacus enim, hendrerit sit amet ultrices nec, porttitor id nisl. Fusce interdum pharetra metus sit amet blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis semper libero cursus semper consequat. Nullam nec dapibus nisi, eu convallis ligula. Sed tristique nisl quis faucibus ullamcorper. Fusce a nisl ac sem pretium tincidunt. Cras lobortis mattis sodales. Vivamus bibendum turpis sit amet nibh laoreet porta. Phasellus porttitor dignissim quam et gravida. Morbi aliquam ut neque eget rhoncus. Nunc ac nisi ante. Nullam efficitur eros ut nibh pulvinar, ut volutpat ligula sodales. Proin bibendum dignissim orci et egestas. Nunc tortor odio, dictum id lorem quis, gravida consequat tortor. Cras auctor fermentum libero. Suspendisse non nisl nisi. Curabitur fringilla neque neque, vitae iaculis tortor vestibulum id. Praesent viverra libero et ornare auctor. Nunc a lectus lorem. Duis et magna tempus, venenatis leo in, consectetur tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vitae convallis diam. Integer gravida consequat ex, nec hendrerit est vestibulum a. Phasellus eu ante et urna facilisis convallis. Morbi volutpat mauris sit amet diam placerat, nec iaculis mauris rutrum. Donec nulla felis, vestibulum elementum efficitur non, bibendum et massa. Donec dolor tortor, molestie at eleifend vitae, pharetra vitae ex. Suspendisse tellus velit, porttitor ac dapibus nec, volutpat vitae mauris. Sed vel ultrices.'
    )

    this.setState({ searchText })

    if (searchText) {
      this.setState({
        isSearching: true,
        isLoading: true,
      })

      //Simulating data fetching
      Meteor.setTimeout(() => {
        this.setState({
          isLoading: false,
          searchResults: this.state.isSearching ? results : [],
        })
      }, 1100)
    } else {
      this.setState({
        isSearching: false,
        searchResults: [],
      })
    }
  }
  _clearSearch() {
    const searchInput = ReactDOM.findDOMNode(this.refs.searchInput)

    searchInput.value = ''
    searchInput.focus()

    this._search()
  }
  _searchFocus() {
    this.setState({ isFocused: true })
  }
  _searchBlur() {
    this.setState({ isFocused: false })
  }
}
