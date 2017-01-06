/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'
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
import DropdownMenu from '../DropdownMenu'

// Containers
import UserContainer from '/imports/client/Containers/User'

//Styled Components
const SearchInputWrapper = styled.div`
	flex-grow: 100000;

	@media (max-width: 780px) {
		display: none;
	}
`

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoginModalOpen: false,
			isRegisterModalOpen: false,
		}
	}
	render() {
    const {
      user,
    } = this.props

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
		      	boxShadow: `0 1px 4px ${grey400}`,
		      	display: 'flex',
		      	alignItems: 'center',
		      }}
		    >
					<Link to="/">
			    	<EventSeatIcon
			    		color={cyan400}
			    		style={{
			    			marginRight: 20,
			    			height: 40,
			    			width: 40,
			    		}}
			    	/>
					</Link>

					<SearchInputWrapper>
						<SearchInput />
					</SearchInputWrapper>

          { isEmpty(user) ? 
            (
              <p
                style={{
                  marginLeft: 50,
                  color: cyan400,
                  cursor: 'pointer',
                }}
                onClick={this.openLoginModal.bind(this)}
                data-name="header-login-btn"
              >
                Login
              </p>
            ) : (
              <p
                style={{
                  marginLeft: 50,
                }}
                data-name="header-login-btn"
              >
                Welcome, {this.props.user.profile.firstName}
              </p>
            )
          }

          { !isEmpty(user) ?
            (
              <DropdownMenu
                label={
                  <MoreVertIcon
                    color={grey800}
                    style={{
                      marginLeft: 15,
                      height: 20,
                    }}
                  />
                }
                pullLeft
              >
                <Link to="/dashboard">Dashboard</Link>
                <Link to="#" onClick={this.logoutUser}>Logout</Link>
              </DropdownMenu>
            ) : null
          }
		    </div>

				<Modal
					isOpen={this.state.isLoginModalOpen}
					close={this.closeLoginModal.bind(this)}
					style={{
						padding: 90,
					}}
				>
					<SignIn
						openRegisterModal={this.openRegisterModal.bind(this)}
						closeThisModal={this.closeLoginModal.bind(this)}
					/>
				</Modal>

				<Modal
					isOpen={this.state.isRegisterModalOpen}
					close={this.closeRegisterModal.bind(this)}
					style={{
						padding: 90,
					}}
				>
					<SignUp
						openLoginModal={this.openLoginModal.bind(this)}
						closeThisModal={this.closeRegisterModal.bind(this)}
					/>
				</Modal>
			</div>
		)
	}
	openLoginModal() {
		this.setState({ isLoginModalOpen: true })
	}
	openRegisterModal() {
		this.setState({ isRegisterModalOpen: true })
	}
	closeLoginModal() {
		this.setState({ isLoginModalOpen: false })
	}
	closeRegisterModal() {
		this.setState({ isRegisterModalOpen: false })
	}
  logoutUser(e) {
    e.preventDefault()
    Meteor.logout()
  }
}

export default UserContainer(Header)
