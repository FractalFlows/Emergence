/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {
  compose,
} from 'recompose'
import { isEmpty } from 'lodash/fp'
import { RaisedButton } from 'material-ui'
import {
  white,
  grey300,
  grey400,
  red300,
  red400,
} from 'material-ui/styles/colors'
import { debounce } from 'lodash'
import { flow, uniqBy, filter } from 'lodash/fp'
import { redux as ArticleReduxContainer } from '../container'

// Components
import ArticleItem from './DropdownRelatedItem'

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

class RelatedArticleInput extends React.Component {
  constructor() {
    super()
    this.state = {
      showDropdown: false,
    }
  }

  propTypes: {
    cancel: React.PropTypes.func,
    showSnackbar: React.PropTypes.func,
    articleSlug: React.PropTypes.string.isRequired,
  }

  render() {
    const { showDropdown } = this.state
    const {
      currentRelatedArticlesDOIs,
      articleState: { relatedArticles },
    } = this.props
    const filteredRelatedArticlesResult = flow(
      uniqBy('DOI'),
      filter(({ DOI }) => !currentRelatedArticlesDOIs.includes(DOI)),
    )(relatedArticles)

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
              onInput={(event) => {
                const val = event.target.value
                if(!val){
                  this.props.clearRelatedsSearch()
                } else {
                  this.props.searchRelatedArticles({
                    articleSlug: this.props.articleSlug,
                    searchText: val,
                  })
                } 
              }}
              onBlur={this.hideSearchResults.bind(this)}
              onFocus={this.showSearchResults.bind(this)}
            />

            <ResultsDropdown
              style={{
                display: (!isEmpty(relatedArticles) && showDropdown) ? 'block' : 'none',
              }}
            >
              {filteredRelatedArticlesResult.map(
                result => <ArticleItem
                  key={result.DOI}
                  article={result}
                  showSnackbar={this.props.showSnackbar}
                  hideInput={this.props.cancel}
                  searchText={this.state.searchText}
                  addRelatedArticle={({ DOI, source }) => this.props.addRelatedArticle({
                    DOI,
                    source,
                    sourceArticleSlug: this.props.articleSlug,
                  })}
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

  showSearchResults() {
    this.setState({ showDropdown: true })
  }

  hideSearchResults() {
    setTimeout(() => {
      this.setState({ showDropdown: false })
    }, 150)
  }
}

export default compose(
  ArticleReduxContainer,
)(RelatedArticleInput)
