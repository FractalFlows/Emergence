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
    articleSlug: React.PropTypes.string.isRequired,
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
              onChange={this.search.bind(this)}
              onBlur={this.searchBlur.bind(this)}
              onFocus={this.searchFocus.bind(this)}
            />

            <ResultsDropdown
              style={{
                display: this.state.showDropdown ? 'block' : 'none',
              }}
            >
              {this.state.searchResults.map(
                result => <ArticleItem
                  key={result.DOI}
                  article={result}
                  showSnackbar={this.props.showSnackbar}
                  hideInput={this.props.cancel}
                  searchText={this.state.searchText}
                  addRelatedArticle={this.addRelatedArticle.bind(this)}
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
  search(event) {
    const searchText = event.target.value
    this.setState({ searchText })

    if (searchText) {
      this.setState({ isLoading: true })

      Meteor.call('article/searchForRelateds', {
        searchText,
        articleSlug: this.props.articleSlug,
      }, (error, results) => {
        if(error){
          console.warn(error)
          return
        }

        this.setState({
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
  searchFocus() {
    this.setState({ showDropdown: true })
  }
  searchBlur(event) {
    Meteor.setTimeout(() => {
      const input = event.target.value
      const isBlurred = input && !input.matches(':focus')

      isBlurred && this.setState({ showDropdown: false })
    }, 150)
  }
  addRelatedArticle(article){
    Meteor.call('article/addRelated', {
      DOI: article.DOI,
      articleSlug: this.props.articleSlug,
    }, () => {
      this.search({ target: {value: this.props.searchText} })
    })
  }
}
