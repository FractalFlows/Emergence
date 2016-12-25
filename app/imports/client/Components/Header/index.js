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
	grey400,
	grey800,
} from 'material-ui/styles/colors'

// Components
import Modal from '../Modal'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import SearchInput from '../SearchInput'

//Styled Components
const SearchInputWrapper = styled.div`
	flex-grow: 100000;

	@media (max-width: 780px) {
		display: none;
	}
`

export default class Header extends React.Component {
	constructor() {
		super()
		this.state = {
			isLoginModalOpen: false,
			isRegisterModalOpen: false,
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
		      	boxShadow: `0 2px 8px ${grey400}`,
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

					<SearchInputWrapper>
						<SearchInput />
					</SearchInputWrapper>

		    	<p
		    		style={{
		    			marginLeft: 50,
		    			color: cyan400,
							cursor: 'pointer',
		    		}}
						onClick={this._openLoginModal.bind(this)}
		    	>
		    		Login
		    	</p>
		    </div>
				<Modal isOpen={this.state.isLoginModalOpen}>
					<SignIn
						openRegisterModal={this._openRegisterModal.bind(this)}
						closeThisModal={this._closeLoginModal.bind(this)}
					/>
				</Modal>

				<Modal isOpen={this.state.isRegisterModalOpen}>
					<SignUp
						openLoginModal={this._openLoginModal.bind(this)}
						closeThisModal={this._closeRegisterModal.bind(this)}
					/>
				</Modal>
			</div>
		)
	}
	_openLoginModal() {
		this.setState({
			isLoginModalOpen: true,
		})
	}
	_openRegisterModal() {
		this.setState({
			isRegisterModalOpen: true,
		})
	}
	_closeLoginModal() {
		this.setState({
			isLoginModalOpen: false,
		})
	}
	_closeRegisterModal() {
		this.setState({
			isRegisterModalOpen: false,
		})
	}
}
