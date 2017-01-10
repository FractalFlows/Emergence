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
        DOI: '10.1109/TC.2002.100914',
      },
    ].filter(article => article.title.match(new RegExp(`(${searchText})`, 'gi')))

    results.map(article =>
      article.abstract = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet ligula a neque dapibus maximus sed eu velit. Donec mattis congue tellus quis condimentum. Aliquam pulvinar rutrum tortor a tempus. Duis maximus vel neque sit amet pellentesque. Maecenas tincidunt nisl id sapien iaculis iaculis. Sed aliquet id dolor gravida lobortis. Cras quam tellus, euismod sit amet quam eleifend, cursus lacinia mauris. Donec nec vulputate turpis, et malesuada eros. Nulla nec nulla non ante volutpat dignissim vitae a lorem. Vestibulum lacus enim, hendrerit sit amet ultrices nec, porttitor id nisl. Fusce interdum pharetra metus sit amet blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis semper libero cursus semper consequat. Nullam nec dapibus nisi, eu convallis ligula. Sed tristique nisl quis faucibus ullamcorper. Fusce a nisl ac sem pretium tincidunt. Cras lobortis mattis sodales. Vivamus bibendum turpis sit amet nibh laoreet porta. Phasellus porttitor dignissim quam et gravida. Morbi aliquam ut neque eget rhoncus. Nunc ac nisi ante. Nullam efficitur eros ut nibh pulvinar, ut volutpat ligula sodales. Proin bibendum dignissim orci et egestas. Nunc tortor odio, dictum id lorem quis, gravida consequat tortor. Cras auctor fermentum libero. Suspendisse non nisl nisi. Curabitur fringilla neque neque, vitae iaculis tortor vestibulum id. Praesent viverra libero et ornare auctor. Nunc a lectus lorem. Duis et magna tempus, venenatis leo in, consectetur tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vitae convallis diam. Integer gravida consequat ex, nec hendrerit est vestibulum a. Phasellus eu ante et urna facilisis convallis. Morbi volutpat mauris sit amet diam placerat, nec iaculis mauris rutrum. Donec nulla felis, vestibulum elementum efficitur non, bibendum et massa. Donec dolor tortor, molestie at eleifend vitae, pharetra vitae ex. Suspendisse tellus velit, porttitor ac dapibus nec, volutpat vitae mauris. Sed vel ultrices.'
    )

    this.setState({ searchText })

    if (searchText) {
      this.setState({ isLoading: true })

      //Simulating data fetching
      Meteor.setTimeout(() => {
        this.setState({
          isLoading: false,
          showDropdown: true,
          searchResults: this.state.searchText ? results : [],
        })
      }, 1100)
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

    this._search()
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
