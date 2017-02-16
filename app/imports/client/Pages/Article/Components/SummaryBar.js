/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import { get } from 'lodash/fp'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { FlatButton } from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/image/edit'
import PlusIcon from 'material-ui/svg-icons/content/add'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import {
  green400,
  grey100,
  grey200,
  grey400,
  grey500,
  grey600,
  grey700,
  grey800,
  red400,
  red800,
} from 'material-ui/styles/colors'
import moment from 'moment'
import { UPVOTE, DOWNVOTE } from '/imports/both/collections/articles'

// Helpers
import requireLoginBefore from '/imports/client/Utils/requireLoginBefore'

//Styled Components
const SummaryContent = styled.div`
  border: 1px solid ${grey200};
  border-top: none;
  height: 0;
  overflow: hidden;
  transition: 0.15s;

  p {
    color: ${grey700};
    font-size: 14px;
    padding: 5px 20px 20px 20px;
  }
`

const VoteButton = styled.div`
  margin-left: 15px;
`

const VoteButtonHolder = styled.div`
  opacity: .8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

const Votes = styled.div`
  color: ${grey500};
  font-size: 12px;
  text-align: center;
`

class ArticleSummary extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      contentIsVisible: false,
    }
  }
  propTypes: {
    summary: React.PropTypes.object.isRequired,
  }
  render() {
    const { summary = {} } = this.props

    return (
      <div
        style={{
          marginBottom: 15,
          display: 'flex',
        }}
      >
        <div
          style={{
            flexGrow: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: grey100,
              display: 'flex',
              alignItems: 'center',
              height: 50,
              cursor: 'pointer',
            }}
            title="Click to expand"
            onClick={this._toggleContent.bind(this)}
          >
            <PlusIcon
              color={grey500}
              style={{
                margin: '0 40px 0 30px',
              }}
              />
            <span
              style={{
                color: grey600,
                flexGrow: 1,
                fontSize: 13,
              }}
              >
              Summary by <span style={{color: grey800}}>{summary.authorName}</span>
            </span>
            <span
              style={{
                color: grey500,
                width: 300,
                fontSize: 13,
              }}
              >
              {moment(summary.updatedAt).format('MMM D, YYYY')}
            </span>
          </div>

          <SummaryContent
            ref="content"
          >
            <p>{summary.content}</p>
          </SummaryContent>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
          }}
        >
          <VoteButton
            onClick={this.upvote.bind(this)}
            data-name={`${summary.authorId}-upvote-btn`}
          >
            <VoteButtonHolder
              title="Upvote"
            >
              <ThumbUp color={green400} />
            </VoteButtonHolder>

            <Votes>{summary.upVotes}</Votes>
          </VoteButton>

          <VoteButton
            onClick={this.downvote.bind(this)}
            data-name={`${summary.authorId}-downvote-btn`}
          >
            <VoteButtonHolder
              title="Downvote"
            >
              <ThumbDown color={red400} />
            </VoteButtonHolder>
            <Votes>{summary.downVotes}</Votes>
          </VoteButton>


          { summary.authorId === get('_id', this.props.user) ? (
              [ 
                <FlatButton
                  style={{ marginLeft: 10 }}
                  icon={<DeleteIcon color={red800}/>}
                  onClick={() => Meteor.call('article/deleteSummary', {
                    summary: { authorId: summary.authorId },
                    articleSlug: this.props.articleSlug,
                  })}
                />,
                <FlatButton
                  icon={<EditIcon color={green400}/>}
                  onClick={() => this.props.router.push({
                    pathname: `/article/summary-upsert/${this.props.articleSlug}`,
                    state: { modal: true, summary: { content: summary.content } },
                  })}
                />
              ]
            ) : null
          }
        </div>
      </div>
    )
  }

  upvote(){
    requireLoginBefore(() => {
      Meteor.call('article/voteForSummary', {
        vote: UPVOTE,
        articleSlug: this.props.articleSlug,
        authorId: this.props.summary.authorId,
      })
    })
  }

  downvote(){
    requireLoginBefore(() => {
      Meteor.call('article/voteForSummary', {
        vote: DOWNVOTE,
        articleSlug: this.props.articleSlug,
        authorId: this.props.summary.authorId,
      })
    })
  }

  _toggleContent() {
    const content = ReactDOM.findDOMNode(this.refs.content)

    if (this.state.contentIsVisible) {
      content.style.height = 0
    } else {
      content.style.height = `${content.scrollHeight}px`
    }

    this.setState({
      contentIsVisible: !this.state.contentIsVisible,
    })
  }
}

export default compose(
  withRouter,
)(ArticleSummary)
