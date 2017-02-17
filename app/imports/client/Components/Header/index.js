/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'
import styled from 'styled-components'
import {
  compose,
  pure,
  withState,
  withProps,
} from 'recompose'
import EventSeatIcon from 'material-ui/svg-icons/action/event-seat'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {
	white,
	cyan400,
	grey100,
	grey400,
	grey800,
} from 'material-ui/styles/colors'
import ShowOnScrollTop from 'react-show-on-scroll-top'

// Components
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import SearchInput from '../SearchInput'
import DropdownMenu from '../DropdownMenu'
import HeaderContent from './HeaderContent'
import HeaderActions from './HeaderActions'
import SearchInputWrapper from './SearchInputWrapper'

// Containers
import UserContainer from '/imports/client/Pages/User/container'
import { withRouter } from 'react-router'

//Styled Components
const SearchInputMobileWrapper = styled.div`
	width: 100%;
	display: none;

	@media (max-width: 780px) {
		display: initial;
	}
`

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  zIndex: 500;
  boxSizing: border-box;
`

function Header({
  user,
  location,
  isSearchFocused,
  logoutUser,
  searchInputFocusedHandler,
  searchInputBlurredHandler,
}){
  return (
    <HeaderWrapper>
      <ShowOnScrollTop
        lock={isSearchFocused}
      >
        <HeaderContent>
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
            <SearchInput
              onFocus={searchInputFocusedHandler}
              onBlur={searchInputBlurredHandler}
            />
          </SearchInputWrapper>

          <HeaderActions>
          { isEmpty(user) ? 
            (
            <Link
              to={{
                pathname: '/login',
                state: {
                  modal: true,
                  redirTo: location.pathname,
                },
              }}
              style={{
                color: cyan400,
                textDecoration: 'none',
              }}
              data-name="header-login-btn"
            >
              Login
            </Link>
            ) : (
              <p
                style={{
                  marginLeft: 50,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                data-name="header-login-btn"
              >
                Welcome, {user.profile.firstName}
              </p>
            )
          }

          { !isEmpty(user) ?  (
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
                <Link to="#" onClick={logoutUser}>Logout</Link>
              </DropdownMenu>
            ) : null
          }
          </HeaderActions>
        </HeaderContent>

        <SearchInputMobileWrapper>
          <SearchInput />
        </SearchInputMobileWrapper>
      </ShowOnScrollTop>
    </HeaderWrapper>
  )
}

export default compose(
  UserContainer,
  withRouter,
  withState('isSearchFocused', 'setIsSearchFocused', false),
  withProps(({ setIsSearchFocused }) => ({
    logoutUser: e => {
      e.preventDefault()
      Meteor.logout()
    },
    searchInputFocusedHandler: () => setIsSearchFocused(true),
    searchInputBlurredHandler: () => setIsSearchFocused(false),
  })),
  pure,
)(Header)
