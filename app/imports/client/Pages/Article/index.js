/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import {
  RaisedButton,
  Snackbar,
} from 'material-ui'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {
  grey200,
  grey300,
  grey400,
  grey600,
  grey700,
  grey800,
} from 'material-ui/styles/colors'
import { Link } from 'react-router'

// Components
import ArticleSummary from '../../Components/ArticleSummary'
import KnowledgeBit from '../../Components/KnowledgeBit'
import RelatedArticle from '../../Components/RelatedArticle'
import RelatedArticleInput from '../../Components/RelatedArticleInput'
import {
  Panel,
  PanelHeader,
  PanelBody,
} from '../../Components/Panel'

import container from './container'

//Styled Components
const PanelHeaderButton = styled.button`
  backgroundColor: ${grey200};
  color: ${grey600};
  border: 1px solid ${grey300};
  padding: 7px 10px;
  borderRadius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${grey300};
  }
`

const ArticleDetail = styled.p`
  color: ${grey600};
  margin: 0 0 3px 0;
  font-size: 14px;
  display: flex;

  b {
    display: inline-block;
    width: 85px;
    flex-shrink: 0;
  }

  div {
    margin-right: 25px;
  }
`

class Article extends React.Component {
  constructor() {
    super()
    this.state = {
      isAddingNewRelatedArticle: false,
      snackbarIsOpen: false,
      snackbarMessage: '',
    }
  }

  render() {
    const {
      abstract,
      title,
      authors = [],
      summaries = [],
      informations = [],
      relatedArticles = [],
      DOI,
    } = this.props.article || {}

    const knowledgeBits = [
      {
        label: 'ManualRedPR2aEd.pdf',
        type: 'pdf',
        author: 'Yuri Jean Fabris',
      },
      {
        label: 'aframe',
        type: 'github',
        author: 'Gabriel Rubens',
      },
      {
        label: 'Surround360',
        type: 'github',
        author: 'Guilherme Decampo',
      },
      {
        label: 'gvr-android-sdk',
        type: 'github',
        author: 'Luiz Augusto Moratelli',
      },
    ]

    return (
      <div
        style={{
          padding: '40px 150px',
        }}
      >
        <Panel>
          <PanelBody>
            <h1
              style={{
                margin: '0 0 20px 0',
                color: grey800,
                fontSize: 23,
              }}
            >
              {title}
            </h1>
            <ArticleDetail>
              <b>Authors:</b>
              <div>{authors.join(', ')}</div>
            </ArticleDetail>
            <ArticleDetail>
              <b>DOI:</b>
              <div>{DOI}</div>
            </ArticleDetail>
            <ArticleDetail>
              <b>Abstract:</b>
              <div>{abstract}</div>
            </ArticleDetail>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Summaries">
            <PanelHeaderButton>
              Add summary
            </PanelHeaderButton>
          </PanelHeader>
          <PanelBody>
            {summaries.length > 0 ?
              summaries.map((summary, i) =>
                <ArticleSummary key={i} summary={summary} />
              ) :
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <RaisedButton
                  label="Create a new summary"
                  primary
                />
              </div>
            }
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Knowledge bits">
            <Link
              to={{
                pathname: `/article/information-upsert/${this.props.params.slug}`,
                state: { modal: true },
              }}
            >
              <PanelHeaderButton
                data-name="add-knowledge-btn"
              >
                Add knowledge product
              </PanelHeaderButton>
            </Link>
          </PanelHeader>
          <PanelBody>
            {knowledgeBits.length > 0 ?
              knowledgeBits.map((knowledgeBit, i) =>
                <KnowledgeBit key={i} knowledgeBit={knowledgeBit} />
              ) :
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <RaisedButton
                  label="Create a new knowledge bit"
                  primary={true}
                />
              </div>
            }
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Related articles">
            <PanelHeaderButton
              onClick={this._showAddRelatedArticleInput.bind(this)}
            >
              Add more related articles
            </PanelHeaderButton>
          </PanelHeader>
          <PanelBody>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <tbody>
                {relatedArticles.length > 0 ?
                  relatedArticles.map((relatedArticle, i) =>
                    <RelatedArticle key={i} article={relatedArticle} />
                  ) :
                  <div
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <RaisedButton
                      label="Add related articles"
                      primary={true}
                    />
                  </div>
                }
                {this.state.isAddingNewRelatedArticle &&
                  <tr>
                    <td colSpan="2">
                      <RelatedArticleInput
                        cancel={this._hideAddRelatedArticleInput.bind(this)}
                        showSnackbar={this._showSnackbar.bind(this)}
                      />
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </PanelBody>
        </Panel>

        <Snackbar
          open={this.state.snackbarIsOpen}
          message={this.state.snackbarMessage}
          action="undo"
          autoHideDuration={4000}
          onRequestClose={this._hideSnackbar.bind(this)}
        />
      </div>
    )
  }
  _showAddRelatedArticleInput() {
    this.setState({ isAddingNewRelatedArticle: true })
  }
  _hideAddRelatedArticleInput() {
    this.setState({ isAddingNewRelatedArticle: false })
  }

  _showSnackbar(message) {
    this.setState({
      snackbarIsOpen: true,
      snackbarMessage: message,
    })
  }
  _hideSnackbar() {
    this.setState({ snackbarIsOpen: false })
  }
}

export default container(Article)
