/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { RaisedButton } from 'material-ui'
import {
  white,
  grey300,
  grey400,
  red300,
  red400,
} from 'material-ui/styles/colors'

//Components
import ArticleItem from './article_item'

//Styled Components
const Input = styled.input`
  padding: 10px;
  border: 1px solid ${grey300};
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${grey400};
  }
`

const CancelButton = styled.button`
  padding: 0 15px;
  cursor: pointer;
  background-color: ${red300};
  border: none;
  color: ${white};

  &:hover {
    background-color: ${red400};
  }
`

const ResultsDropdown = styled.div`
  background-color: #FFF;
  width: 100%;
  position: absolute;
  top: calc(100% + 1px);
  box-shadow: 0 1px 3px ${grey400};
  max-height: 200px;
  overflow-y: auto;
`

export default class RelatedArticleInput extends React.Component {
  constructor() {
    super()
    this.state = {
      searchText: '',
      searchResults: [],
      showDropdown: false,
    }
  }
  propTypes: {
    cancel: React.PropTypes.func,
    showSnackbar: React.PropTypes.func,
  }
  render() {
    return (
      <div>
        <div
          style={{
            padding: '7px 0',
            display: 'flex',
          }}
        >
          <div
            style={{
              position: 'relative',
              flexGrow: 9999,
            }}
          >
            <Input
              type="text"
              placeholder="Search for a related article"
              autoFocus={true}
              ref="searchInput"
              onChange={this._search.bind(this)}
              onBlur={this._searchBlur.bind(this)}
              onFocus={this._searchFocus.bind(this)}
            />

            <ResultsDropdown
              style={{
                display: this.state.showDropdown ? 'block' : 'none',
              }}
            >
              {this.state.searchResults.map(
                result => <ArticleItem
                  key={result.DOI}
                  info={result}
                  showSnackbar={this.props.showSnackbar}
                  hideInput={this.props.cancel}
                  searchText={this.state.searchText}
                />
              )}
            </ResultsDropdown>
          </div>
          <CancelButton
            onClick={this.props.cancel}
          >
            Cancel
          </CancelButton>
        </div>
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
  _searchFocus() {
    this.setState({ showDropdown: true })
  }
  _searchBlur(event) {
    Meteor.setTimeout(() => {
      const input = ReactDOM.findDOMNode(this.refs.searchInput)
      const isBlurred = input && !input.matches(':focus')

      isBlurred && this.setState({ showDropdown: false })
    }, 150)
  }
}
