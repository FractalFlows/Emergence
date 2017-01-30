/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import styled from 'styled-components'
import {
  white,
  blue300,
  grey100,
  grey200,
  grey500,
  grey800,
} from 'material-ui/styles/colors'

//Styled Components
const ArticleItemRow = styled.div`
  padding: 7px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-bottom: 1px solid ${grey200};

  &:hover {
    background-color: ${grey100};
  }
`

const SaveButton = styled.button`
  background-color: ${blue300};
  color: ${white};
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px 0 25px;
`

export default class ArticleItem extends React.Component {
  render() {
    const {
      article,
      searchText,
      addRelatedArticle,
    } = this.props

    const getHighlightedTitle = () => ({
      __html: article.title.replace(
        new RegExp(`(${searchText})`, 'gi'), '<b>$1</b>')
    })

    return (
      <div>
        <ArticleItemRow>
          <div
            style={{
              flexGrow: 9999,
              paddingLeft: 5
            }}
          >
            <div
              dangerouslySetInnerHTML={getHighlightedTitle()}
              style={{
                color: grey800,
                fontSize: 14,
              }}
            />
              <div
                style={{
                  color: grey500,
                  fontSize: 12,
                }}
              >
              {article.authors.join('; ')}
            </div>
          </div>

          <div>
            <SaveButton
              onClick={() => addRelatedArticle(article)}
            >
              Add
            </SaveButton>
          </div>
        </ArticleItemRow>
      </div>
    )
  }
}
