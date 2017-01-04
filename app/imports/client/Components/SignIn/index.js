/*
 * Built by Astrocoders
 * @flow
 */

import React, {
  PureComponent,
  PropTypes,
} from 'react'
import styled from 'styled-components'
import {
  TextField,
  RaisedButton,
} from 'material-ui'
import EventSeatIcon from 'material-ui/svg-icons/action/event-seat'
import {
	cyan400,
  grey800,
} from 'material-ui/styles/colors'

//Styled Components
const RegisterLink = styled.p`
  color: ${cyan400};
  margin: 0 0 0 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default class SignIn extends PureComponent {
  propTypes: {
    openRegisterModal: PropTypes.func.isRequired,
    closeThisModal: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        style={{
          maxWidth: 450,
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <EventSeatIcon
            color={cyan400}
            style={{
              height: 70,
              width: 70,
            }}
          />
          <h2
            style={{
              color: grey800,
            }}
          >
            Sign in to Emergence
          </h2>
        </div>

        <form
          style={{
            marginBottom: 40,
          }}
        >
          <TextField
            floatingLabelText="Your email"
            fullWidth
          />

          <RaisedButton
            label="Sign Me In"
            primary
            fullWidth
          />
        </form>

        <RegisterLink
          onClick={this.changeModal.bind(this)}
        >
          Do not have an account yet? Register to start sharing your knowledge now!
        </RegisterLink>
      </div>
    )
  }

  changeModal() {
    this.props.openRegisterModal()
    this.props.closeThisModal()
  }
}
