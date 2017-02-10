/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { get } from 'lodash/fp'
import { compose } from 'recompose'
import { connect } from 'react-refetch'
import { withRouter } from 'react-router'
import { FlatButton } from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/image/edit'
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
import { UPVOTE, DOWNVOTE } from '/imports/both/collections/articles'

// Containers
import UserContainer from '/imports/client/Pages/User/container'

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

const CommitListItemMessage = styled.li`
  fontSize: 12px;
  lineHeight: 12px;
  color: grey500;
  textOverflow: ellipsis;
  overflow: hidden;
  maxWidth: 70%;
  whiteSpace: nowrap;
  padding: 5px 0;
`

const KnowledgeBitBarItem = styled.div`
  flex-grow: 9999;
  @media (max-width: 780px){
    flex-grow: 2;
    max-width: 70%;

    & ~ div {
      min-width: 30%;
      flex-grow: 1;
    }
  }
`

class KnowledgeBit extends React.Component {
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
    const { knowledgeBit, commitsFetch } = this.props
    const commits = commitsFetch.rejected || commitsFetch.pending ? [] : commitsFetch.value
		const iconStyles = {
			color: grey500,
			margin: '0 40px 0 30px',
		}

    return (
      <div
        style={{
          marginBottom: 15,
          display: 'flex',
        }}
      >
        <KnowledgeBitBarItem>
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
              {knowledgeBit.label}&nbsp;
            </span>
            <span
              style={{
                color: grey500,
                width: 300,
                fontSize: 13,
              }}
            >
              by {knowledgeBit.addedByName}
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
								{commits.map((commit, i) => (
									<li
										style={{
											display: 'flex',
											marginBottom: 5,
                      maxWidth: '60%',
                      alignItems: 'center',
										}}
                    key={commit.sha}
									>
										<HashLink href={commit.html_url} target="_blank">
											{commit.sha.slice(0, 8)}
										</HashLink>
										<CommitListItemMessage>
											{commit.commit.message.split('\n')[0]}{' - '}
										</CommitListItemMessage>
										<span
											style={{
												fontSize: 12,
												lineHeight: '12px',
												color: grey700,
											}}
										>
											&nbsp;{commit.commit.author.name}
										</span>
									</li>
								))}
	            </ul>
	          </SummaryContent>
					}
        </KnowledgeBitBarItem>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
          }}
        >
          <VoteButton
            data-name={`${knowledgeBit.link}-upvote-btn`}
            onClick={this.upvote.bind(this)}
          >
            <VoteButtonHolder
              title="Upvote"
            >
              <ThumbUp color={green400} />
            </VoteButtonHolder>

            <Votes>
            {knowledgeBit.upVotes}
            </Votes>
          </VoteButton>

          <VoteButton
            data-name={`${knowledgeBit.link}-downvote-btn`}
            onClick={this.downvote.bind(this)}
          >
            <VoteButtonHolder
              title="Downvote"
            >
              <ThumbDown color={red400} />
            </VoteButtonHolder>
            <Votes>
            {knowledgeBit.downVotes}
            </Votes>
          </VoteButton>

          { knowledgeBit.addedById === get('_id', this.props.user) ? (
              [ 
                <FlatButton
                  style={{ marginLeft: 10 }}
                  icon={<DeleteIcon color={red800}/>}
                  onClick={() => Meteor.call('article/deleteInformation', {
                    information: { link: knowledgeBit.link },
                    articleSlug: this.props.articleSlug,
                  })}
                />,
                <FlatButton
                  icon={<EditIcon color={green400}/>}
                  onClick={() => this.props.router.push({
                    pathname: `/article/information-upsert/${this.props.articleSlug}`,
                    state: {
                      modal: true,
                      isEdit: true,
                      information: {
                        type: knowledgeBit.type,
                        link: knowledgeBit.link,
                      },
                    },
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
      Meteor.call('article/voteForInformation', {
        vote: UPVOTE,
        articleSlug: this.props.articleSlug,
        link: this.props.knowledgeBit.link,
      })
    })
  }

  downvote(){
    requireLoginBefore(() => {
      Meteor.call('article/voteForInformation', {
        vote: DOWNVOTE,
        articleSlug: this.props.articleSlug,
        link: this.props.knowledgeBit.link,
      })
    })
  }

  _toggleContent() {
    if(this.props.knowledgeBit.type === 'pdf'){
      window.open(this.props.knowledgeBit.link, '_blank')
      return
    }

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

export default compose(
  connect(props => ({
    commitsFetch: (
      props.knowledgeBit.type === 'github' ?
      `https://api.github.com/repos/${props.knowledgeBit.link.replace('https://github.com/', '')}/commits` :
      ''
    ),
  })),
  UserContainer,
  withRouter,
)(KnowledgeBit)
