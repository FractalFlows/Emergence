/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import {
  grey100,
  grey200,
  grey500,
  grey800,
} from 'material-ui/styles/colors'

//Styled Components
const ArticleItemLink = styled.div`
  &:hover, &.hover {
    background-color: ${grey100};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${grey200};
  }
`

const ArticleName = styled.p`
  color: ${grey800};
  font-size: 15px;
  line-height: 15px;
  margin: 0 0 6px 0;
`

const ArticleDetail = styled.p`
  font-size: 12px;
  color: ${grey500};
  margin: 0;
  display: flex;

  b {
    display: inline-block;
    width: 85px;
    flex-shrink: 0;
  }
`

class ArticleItem extends React.Component {
  propTypes: {
    info: React.PropTypes.object.isRequired,
    searchText: React.PropTypes.string,
  }

  render() {
    const {
      info: article,
      searchText,
      onClick,
    } = this.props

    return (
      <ArticleItemLink
        className="dropdown-article-item"
        onMouseOver={this._removeResultsFocus}
      >
        <div
          style={{
            padding: 15,
            display: 'block',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          onClick={onClick}
        >
          <ArticleName
            dangerouslySetInnerHTML={this.getHighlightedTitle()}
          />
          <ArticleDetail>
            <b>Authors:</b> <div>{article.authors.join('; ')}</div>
          </ArticleDetail>
          <ArticleDetail>
            <b>DOI:</b> <div>{article.DOI}</div>
          </ArticleDetail>
          <ArticleDetail
            title={article.abstract.length > 300 ? article.abstract : ''}
          >
            <b>Abstract:</b> <div>{article.abstract.length > 300 ?
              `${article.abstract.substring(0, 300)}...` :
              article.abstract
            }</div>
          </ArticleDetail>
        </div>
      </ArticleItemLink>
    )
  }

  _removeResultsFocus() {
    const selectedResult =
      document.querySelector('.dropdown-article-item.hover')

    if (selectedResult) {
      selectedResult.classList.remove('hover')
    }
  }

  getHighlightedTitle(){
    const { info: article, searchText } = this.props
    return {
      __html: article.title.replace(new RegExp(`(${searchText})`, 'gi'), '<b>$1</b>'),
    }
  }
}

export default withRouter(ArticleItem)
