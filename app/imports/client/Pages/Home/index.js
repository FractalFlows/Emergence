/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import {
	FlatButton,
	Paper,
	TextField,
	RaisedButton,
} from 'material-ui'
import {
	white,
	cyan400,
	grey300,
	grey400,
	grey700,
	grey800,
	lightBlue500,
} from 'material-ui/styles/colors'

// Components
import Modal from '../../Components/Modal'
import SearchInput from '../../Components/SearchInput'

//Styled Components
const SearchInputWrapper = styled.div`
	width: 100%;
	display: none;

	@media (max-width: 780px) {
		display: initial;
	}
`

const P = styled.p`
	text-align: justify;
	color: ${grey700};
	font-size: 15px;
	line-height: 25px;
`

const Title = styled.h2`
	font-size: 22px;
	color: ${grey800};
	margin-top: 30px;
`
const FooterColumn = styled.div`
	width: 33.33%;
	padding: 20px;

	&:not(:last-child) {
		border-right: 1px solid #DDD;
	}
`

const FooterTitle = styled.h4`
	font-size: 18px;
	margin-top: 0;
	color: ${grey800};
`

const FooterList = styled.ul`
	padding: 0;
`

const FooterListItemLink = styled.a`
	color: ${lightBlue500};
	display: inline-block;
	padding: 3px 0;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`

const Hero = styled.div`
	background-image: url(images/background.png);
	overflow: hidden;
	height: auto;
`

class FooterListItem extends React.Component {
	propTypes: {
		link: React.PropTypes.string,
		label: React.PropTypes.string,
	}
	render() {
		return (
			<li
				style={{
					display: 'block',
				}}
			>
				<FooterListItemLink
					href={this.props.link}
					target="_blank"
				>
					{this.props.label}
				</FooterListItemLink>
			</li>
		)
	}
}

class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			isLoginModalOpen: false,
		}
	}
	render() {
		return (
			<div>
		  	<Hero>
		  		<div
		  			style={{
		  				padding: '50px 150px 40px 150px',
		  			}}
		  		>
				  	<h1
				  		style={{
				  			color: white,
				  			margin: 0,
				  			fontSize: 55,
				  			textTransform: 'uppercase',
				  		}}
				  	>
				  		Emergence
				  	</h1>
				  	<h3
				  		style={{
				  			color: white,
				  			margin: 0,
				  			fontSize: 20,
				  			fontWeight: 100,
				  		}}
				  	>
				  		from <b>Fractal Flows</b>
				  	</h3>
			  	</div>

					<SearchInputWrapper>
						<SearchInput />
					</SearchInputWrapper>

			  	<p
			  		style={{
			  			color: white,
			  			padding: '20px 150px 50px 150px',
			  		}}
			  	>
			    	<b>Knowledge bits</b> are numerical bits, files,
			      containing simulation results, experimental results, detailed analysis,
			      datasets, detailed mathematical formulations, scripts, source code,
			      reviews, reproduction of results,
			      etc. They could also be files containing statement of assumptions,
			      hypothesis and methodologies. Knowledge bits are the hidden backbone, essentially the atomic
			      particles composing a scientific work, while the associated scientific
			      publication is merely its projection on a piece of (digital) paper.
			    </p>
			  </Hero>

			  <div
			  	style={{
			  		padding: '30px 150px',
			  	}}
			  >
					<div
						style={{
							display: 'flex',
						}}
					>
						<div
							style={{
								paddingRight: 20,
								width: '50%',
								boxSizing: 'border-box',
							}}
						>
					    <Title>The problem</Title>
					    <P>
					    	Every year there are over <u>2 million</u> articles that are
					      published in scientific peer-review journals/conferences. Hidden under
					      the millions of articles there is an even greater number of <strong><u>knowledge bits</u></strong> that are invisible, will never be
					      checked, will never be shared, will never see the
					      light of day, and will slowly rote, submerged, deep inside the abyss of
					      the authors' brains or hard disks. These so called knowledge bits could be extremely
					      important to assess the reproducibility of articles, and to actually
					      make the articles more useful for others. Unfortunately, the current system does
					      not offer incentives to the authors to share those
					      knowledge bits. As a result we only see a Tsunamy of publications
					      which saturates the attention of engineers, reduces the speed of scientific
					      progress and waste an enormous amount of time and money for society.
					    </P>
						</div>
						<div
							style={{
								paddingLeft: 20,
								width: '50%',
								boxSizing: 'border-box',
							}}
						>
					    <Title>The solution</Title>
					    <P>
					    	We, at <strong>FractalFlows</strong>, are developing a decentralized web
					      application called <strong><em>Emergence</em></strong> that allows anyone to create
					      relationships between articles and their associated knowledge
					      bits which are scattered on the web. This empowers scientist, researchers, engineers and students
					      to quickly discover the relevant scientific activities behind an article and makes it easier to search, discover,
					      collaborate, share, acquire and exchange the necessary knowledge bits revolving around an
					      article, allowing to create an impactful utility for an article beyond
					      the number of citations it received. <em>Emergence</em> is integrated with external web Apps/Services such as Github.
				    	</P>
						</div>
					</div>

			    <div
			    	style={{
			    		textAlign: 'center',
			    		marginTop: 90,
			    	}}
			    >
				    <Title>Ready to take Emergence for a spin right now? Let's go.</Title>

				    <div
				    	style={{
				    		margin: '20px 0 50px 0',
				    	}}
				    >
				    	<FlatButton
				    		label="White Paper"
				    		primary={true}
				    		href="https://github.com/FractalFlows/Emergence/wiki/Emergence-White-Paper"
				    		target="_blank"
				    	/>

					    <span
					    	style={{
					    		padding: '0 20px',
					    	}}
					    >|</span>

				    	<FlatButton
				    		label="Watch the Tour"
				    		secondary={true}
								onClick={this._openLoginModal.bind(this)}
				    	/>
				    </div>
						<Modal isOpen={this.state.isLoginModalOpen}>
					    <iframe
					    	width="871"
					    	height="480"
					    	src="https://www.youtube.com/embed/D3KH5cbAKUc?showinfo=0"
					    	frameBorder="0"
					    	allowFullScreen>
					    </iframe>
						</Modal>
			   	</div>

			   	<div
			   		style={{
			   			display: 'flex',
			   			marginTop: 90,
			   		}}
			   	>
			   		<FooterColumn>
			   			<FooterTitle>Developers resources</FooterTitle>

			   			<FooterList>
			   				<FooterListItem
			   					label="Source code on GitHub"
			   					link="https://github.com/FractalFlows" />
			   				<FooterListItem
			   					label="White Paper"
			   					link="https://github.com/FractalFlows/Emergence/wiki/Emergence-White-Paper" />
			   				<FooterListItem
			   					label="FAQ"
			   					link="https://github.com/FractalFlows/Emergence/wiki/FAQ" />
			   				<FooterListItem
			   					label="API"
			   					link="" />
			   			</FooterList>
			   		</FooterColumn>
			   		<FooterColumn>
			   			<FooterTitle>Community</FooterTitle>

			   			<FooterList>
			   				<FooterListItem
			   					label="Blog"
			   					link="http://emergencefractalflows.tumblr.com/" />
			   				<FooterListItem
			   					label="Slack"
			   					link="" />
			   				<FooterListItem
			   					label="LinkedIn"
			   					link="" />
			   				<FooterListItem
			   					label="Twitter"
			   					link="" />
			   				<FooterListItem
			   					label="YouTube"
			   					link="" />
			   				<FooterListItem
			   					label="Reddit"
			   					link="" />
			   				<FooterListItem
			   					label="Stack Exchange"
			   					link="" />
			   				<FooterListItem
			   					label="Facebook"
			   					link="" />
			   				<FooterListItem
			   					label="Email us"
			   					link="mailto:AI@fractalflows.com" />
			   			</FooterList>
			   		</FooterColumn>
			   		<FooterColumn>
				   		<FooterTitle>
				   			Interested in what we're doing? Join our mailing list.
				   		</FooterTitle>

				   		<TextField
				   			floatingLabelText="Name"
				   		/>
				   		<br />
				   		<TextField
				   			floatingLabelText="Email"
				   		/>
				   		<br />
				   		<br />

				   		<RaisedButton label="Sign Me Up!" primary={true} />
				   	</FooterColumn>
			   	</div>
			  </div>
		  </div>
		)
	}
	_openLoginModal() {
		this.setState({
			isLoginModalOpen: true,
		})
	}
}

export default Home
