/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'
import SvgDeleteIcon from 'material-ui/svg-icons/action/delete'
import {
  grey100,
  grey200,
  grey400,
  grey500,
  grey700,
  grey800,
} from 'material-ui/styles/colors'

//Styled Components
const RelatedArticleRow = styled.tr`
  &:hover {
    background-color: ${grey100};
  }

  td {
    border-bottom: 1px solid ${grey200};
  }
`

const DeleteIcon = styled(SvgDeleteIcon)`
  color: ${grey400} !important;
  cursor: pointer;

  &:hover {
    color: ${grey700} !important;
  }
`

export default class RelatedArticle extends React.Component {
  propTypes: {
    article: React.PropTypes.object.isRequired,
  }
  render() {
    const { article } = this.props

    return (
      <RelatedArticleRow
        title={article.abstract}
      >
        <td>
          <Link
            to={`/article/${article.title}`}
            style={{
              padding: '7px 0',
              display: 'inline-block',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                color: grey800,
                fontSize: 15,
              }}
            >
              {article.title}
            </div>
            <div
              style={{
                color: grey500,
                fontSize: 12,
              }}
            >
              {article.authors.join('; ')}
            </div>
          </Link>
        </td>
        <td
          title="Remove related article"
        >
          <DeleteIcon />
        </td>
      </RelatedArticleRow>
    )
  }
}
