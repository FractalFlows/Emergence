/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { compose } from 'recompose'
import { get, find } from 'lodash/fp'
import {
  RaisedButton,
  TextField,
  Snackbar,
} from 'material-ui'
import {
  grey200,
  grey300,
  grey400,
  grey600,
  grey700,
  grey800,
} from 'material-ui/styles/colors'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import { Link } from 'react-router'

// Components
import KnowledgeBit from '../../Components/KnowledgeBit'
import RelatedArticle from '../../Components/RelatedArticle'
import RelatedArticleInput from '../../Components/RelatedArticleInput'
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  PanelBody,
} from '../../Components/Panel'
import ArticleSummaries from './ArticleSummaries'
import ArticleInformations from './ArticleInformations'

import container from './container'
import UserContainer from '/imports/client/Containers/User'

import requireLoginAndGoTo from '/imports/client/Utils/requireLoginAndGoTo'

//Styled Components

const ArticleDetail = styled.div`
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

const ReportArticleButton = styled.div`
  opacity: .4;

  &:hover {
    opacity: .8;
    cursor: pointer;
  }
`

class Article extends React.PureComponent {
  constructor(props) {
    super(props)
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

    const filteredSummaries = summaries.filter(summary => summary.status === 'enabled')
    const filteredInformations = informations.filter(info => info.status === 'enabled')

    return (
      <div
        style={{
          padding: '40px 150px',
        }}
      >
        <Panel>
          <PanelBody>
            <div
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <h1
                style={{
                  color: grey800,
                  fontSize: 23,
                  float: 'left',
                  margin: '0 0 20px 0',
                  width: '95%',
                }}
              >
                {title}
              </h1>
              <ReportArticleButton>
                <WarningIcon
                  color={grey600}
                  style={{
                    float: 'right',
                    height : 30,
                    width: '5%',
                  }}
                  onClick={() => this.props.router.push({
                    pathname: `/article/report-article/${this.props.params.slug}`,
                    state: { modal: true },
                  })}
                />
              </ReportArticleButton>
            </div>
            <div className="addthis_inline_share_toolbox"></div>
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

        <ArticleSummaries
          summaries={filteredSummaries}
          articleSlug={this.props.params.slug}
          user={this.props.user}
        />

        <ArticleInformations
          informations={filteredInformations}
          articleSlug={this.props.params.slug}
          user={this.props.user}
        />

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

export default compose(
  container,
  UserContainer
)(Article)
