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
  TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table'
import { compose } from 'recompose'
import { isEmpty, get, find } from 'lodash/fp'
import Helmet from 'react-helmet'
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
  red300,
} from 'material-ui/styles/colors'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import { Link } from 'react-router'

// Components
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  PanelBody,
} from '../../Components/Panel'
import ArticleSummaries from './Components/Summaries'
import ArticleInformations from './Components/Informations'
import ArticleRelatedArticles from './Components/Relateds'

import { meteor as container } from './container'
import UserContainer from '/imports/client/Pages/User/container'

// Helpers
import requireLoginAndGoTo from '/imports/client/Utils/requireLoginAndGoTo'

//Styled Components

const ArticleDetail = styled.div`
  color: ${grey600};
  margin: 0 0 3px 0;
  font-size: 14px;
  display: flex;
  width: 100%;

  b {
    display: inline-block;
    width: 85px;
    flex-shrink: 0;
  }

  div {
    margin-right: 25px;
    word-break: break-word;
  }
`

const ReportArticleButton = styled.div`
  opacity: .4;

  &:hover {
    opacity: .8;
    cursor: pointer;
  }
`

const ArticleContent = styled.div`
  padding: 5vh 8vw;

  @media (max-width: 780px) {
    padding: 0;
  }
`

class Article extends React.PureComponent {
  render() {
    const {
      abstract,
      title,
      authors = [],
      summaries = [],
      informations = [],
      relatedArticles = [],
      DOI,
      inappropriatedContentReports,
    } = this.props.article || {}

    const { user } = this.props

    const filteredSummaries = summaries.filter(summary => summary.status === 'enabled')
    const filteredInformations = informations.filter(info => info.status === 'enabled')
    const hasUserAlreadyReportedArticle = !isEmpty(inappropriatedContentReports)

    return (
      <ArticleContent>
        <Helmet
          script={[
            { src: 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-587906b430ac8aa4', type: "text/javascript" }
          ]}
        />
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
              <ReportArticleButton
                onClick={
                  !hasUserAlreadyReportedArticle ? (
                    () => requireLoginAndGoTo({
                      pathname: `/article/report-article/${this.props.params.slug}`,
                      state: { modal: true },
                    }) 
                  ) : null
                }
                data-name="report-btn"
              >
                <WarningIcon
                  color={hasUserAlreadyReportedArticle ? red300 : grey600}
                  style={{
                    float: 'right',
                    height : 30,
                    width: '5%',
                  }}
                />
              </ReportArticleButton>
            </div>
            <div
              className="addthis_inline_share_toolbox"
              style={{
                padding: '10px 0',
              }}
            />
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
          user={user}
        />

        <ArticleInformations
          informations={filteredInformations}
          articleSlug={this.props.params.slug}
          user={user}
        />

        <ArticleRelatedArticles
          relatedArticles={relatedArticles}
          articleSlug={this.props.params.slug}
          user={user}
        />
      </ArticleContent>
    )
  }
}

export default compose(
  container,
  UserContainer
)(Article)
