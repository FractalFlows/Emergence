/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import EventSeatIcon from 'material-ui/svg-icons/action/event-seat'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {
	white,
	cyan400,
	grey100,
	grey800,
} from 'material-ui/styles/colors'

// Components
import Modal from '../Modal'

//Styled Components
const Input = styled.input`
	padding: 15px;
	border: none;
	background-color: ${grey100};
	flex-grow: 100000;

	&:focus {
		outline: none;
	}

	@media (max-device-width: 780px) {
		display: none;
	}
`

export default class Header extends React.Component {
	constructor() {
		super()
		this.state = {
			isLoginModalOpen: false,
		}
	}
	render() {
		return (
			<div>
				<div
		      style={{
		      	position: 'fixed',
		      	top: 0,
		      	zIndex: 500,
		      	boxSizing: 'border-box',
		      	width: '100%',
		      	padding: '7px 150px',
		      	backgroundColor: white,
		      	// boxShadow: '-2px 2px 7px #E0E0E0',
		      	display: 'flex',
		      	alignItems: 'center',
		      }}
		    >
		    	<EventSeatIcon
		    		color={cyan400}
		    		style={{
		    			marginRight: 20,
		    			height: 40,
		    			width: 40,
		    		}}
		    	/>

		    	<Input
		    		type="text"
		    		placeholder="Enter an article DOI, title, author or keywords"
		    	/>
		    	<p
		    		style={{
		    			marginLeft: 50,
		    			color: grey800,
		    		}}
						onClick={this._openLoginModal.bind(this)}
		    	>
		    		Login
		    	</p>
		    </div>
				<Modal isOpen={this.state.isLoginModalOpen}>
					{/*<Component />*/}
				</Modal>
			</div>
		)
	}
	_openLoginModal() {
		this.setState({
			isLoginModalOpen: true,
		})
	}
}
