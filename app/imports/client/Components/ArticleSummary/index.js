/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
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
} from 'material-ui/styles/colors'
import moment from 'moment'

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

export default class ArticleSummary extends React.Component {
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
    const { summary } = this.props

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
              color={grey400}
              style={{
                margin: '0 40px 0 30px',
              }}
              />
            <span
              style={{
                color: grey600,
                flexGrow: 1,
                fontSize: 15,
              }}
              >
              Summary by <span style={{color: grey800}}>{summary.author}</span>
            </span>
            <span
              style={{
                color: grey500,
                paddingRight: 200,
                fontSize: 13,
              }}
              >
              {moment(summary.date).format('MMM D, YYYY')}
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
          <VoteButton>
            <VoteButtonHolder
              title="Upvote"
            >
              <ThumbUp color={green400} />
            </VoteButtonHolder>

            <Votes>
              64
            </Votes>
          </VoteButton>

          <VoteButton>
            <VoteButtonHolder
              title="Downvote"
            >
              <ThumbDown color={red400} />
            </VoteButtonHolder>
            <Votes>
              12
            </Votes>
          </VoteButton>
        </div>
      </div>
    )
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
