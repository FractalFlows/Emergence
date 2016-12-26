/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import PlusIcon from 'material-ui/svg-icons/content/add'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import {
  green400,
  grey100,
  grey400,
  grey500,
  grey600,
  grey800,
  red400,
} from 'material-ui/styles/colors'
import moment from 'moment'

//Styled Components
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
  propTypes: {
    summary: React.PropTypes.object.isRequired,
  }
  render() {
    const { summary } = this.props

    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <div
            style={{
              backgroundColor: grey100,
              display: 'flex',
              alignItems: 'center',
              height: 50,
              borderRadius: 25,
              flexGrow: 9999,
              cursor: 'pointer',
            }}
            title="Click to expand"
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
}
