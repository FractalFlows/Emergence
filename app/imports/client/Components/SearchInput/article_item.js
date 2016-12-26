/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
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
  margin: 0 0 5px 0;
`

const ArticleDetail = styled.p`
  font-size: 12px;
  color: ${grey500};
  margin: 0;
`

export default class ArticleItem extends React.Component {
  propTypes: {
    info: React.PropTypes.object.isRequired,
    searchText: React.PropTypes.string,
  }
  render() {
    const {
      info: article,
      searchText,
    } = this.props

    const getHighlightedTitle = () => ({
      __html: article.title.replace(
        new RegExp(`(${searchText})`, 'gi'), '<b>$1</b>')
    })

    return (
      <ArticleItemLink
        className="dropdown-article-item"
        onMouseOver={this._removeResultsFocus}
      >
        <Link
          to={`/article/${article.title}`}
          style={{
            padding: 15,
            display: 'block',
            textDecoration: 'none',
          }}
        >
          <ArticleName
            dangerouslySetInnerHTML={getHighlightedTitle()}
          />
          <ArticleDetail>
            <b>Authors:</b> {article.authors.join('; ')}
          </ArticleDetail>
          <ArticleDetail>
            <b>DOI:</b> {article.DOI}
          </ArticleDetail>
          <ArticleDetail
            title={article.abstract.length > 300 ? article.abstract : ''}
          >
            <b>Abstract:</b> {article.abstract.length > 300 ?
              `${article.abstract.substring(0, 300)}...` :
              article.abstract
            }
          </ArticleDetail>
        </Link>
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
}
