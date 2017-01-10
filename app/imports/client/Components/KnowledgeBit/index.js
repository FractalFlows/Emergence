/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PdfIcon from 'material-ui/svg-icons/image/picture-as-pdf'
import RepositoryIcon from 'material-ui/svg-icons/action/class'
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

const HashLink = styled.a`
	display: inline-block;
	color: ${red800};
	background-color: ${grey100};
	text-decoration: none;
	font-size: 12px;
	line-height: 12px;
	cursor: pointer;
	padding: 5px;
	margin-right: 20px;
	font-family: monospace;

	&:hover {
		text-decoration: underline;
	}
`

export default class KnowledgeBit extends React.Component {
  constructor() {
    super()
    this.state = {
      contentIsVisible: false,
    }
  }
  propTypes: {
    knowledgeBit: React.PropTypes.object.isRequired,
  }
  render() {
    const { knowledgeBit } = this.props
		const iconStyles = {
			color: grey500,
			margin: '0 40px 0 30px',
		}

		knowledgeBit.commits = [
      {
        hash: '8645586',
        message: 'Add todda00:friendly-slugs',
				author: 'Gabriel Rubens',
      },
      {
        hash: 'fd8d99c',
        message: 'Init Article title slugs',
				author: 'Gabriel Rubens',
      },
      {
        hash: 'd8f7a96',
        message: 'Update dev/createArticles with abstract field',
				author: 'Gabriel Rubens',
      },
      {
        hash: 'dffd638',
        message: 'Create articles.bySlug publication',
				author: 'Gabriel Rubens',
      },
      {
        hash: '000a1bd',
        message: 'Add compose-with-tracker',
				author: 'Gabriel Rubens',
      },
      {
        hash: '4b5c78a',
        message: 'Fix misusage of collection in articles.bySlug',
				author: 'Gabriel Rubens',
      },
      {
        hash: '8f2a073',
        message: 'Create subscription container for Article ',
				author: 'Gabriel Rubens',
      },
      {
        hash: '66e5158',
        message: 'Hook Pages/Article with slug subscription',
				author: 'Gabriel Rubens',
      },
      {
        hash: 'd6fec48',
        message: 'Add slug to articles schema',
				author: 'Gabriel Rubens',
      },
      {
        hash: '3475d18',
        message: 'Update lodash, react-redux and redux-form',
				author: 'Gabriel Rubens',
      },
    ]

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
            title={knowledgeBit.type === 'pdf' ?
							'Click to view' :
							'Click to expand'
						}
            onClick={this._toggleContent.bind(this)}
          >
						{knowledgeBit.type === 'pdf' ?
							<PdfIcon style={iconStyles} /> :
							<RepositoryIcon style={iconStyles} />
						}
            <span
              style={{
                color: grey700,
                flexGrow: 1,
                fontSize: 13,
              }}
            >
              {knowledgeBit.label}
            </span>
            <span
              style={{
                color: grey500,
                width: 300,
                fontSize: 13,
              }}
            >
              {knowledgeBit.author}
            </span>
          </div>


					{knowledgeBit.type === 'github' &&
						<SummaryContent
	            ref="content"
	          >
	            <ul
								style={{
									paddingLeft: 20,
								}}
							>
								{knowledgeBit.commits.map((commit, i) => (
									<li
										style={{
											display: 'block',
											marginBottom: 3,
										}}
									>
										<HashLink target="_blank">
											{commit.hash}
										</HashLink>
										<span
											style={{
												fontSize: 12,
												lineHeight: '12px',
												color: grey500,
											}}
										>
											{commit.message}{' - '}
										</span>
										<span
											style={{
												fontSize: 12,
												lineHeight: '12px',
												color: grey700,
											}}
										>
											{commit.author}
										</span>
									</li>
								))}
	            </ul>
	          </SummaryContent>
					}
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

		if (!content) return

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
