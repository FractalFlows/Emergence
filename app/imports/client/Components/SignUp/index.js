/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
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

const RegisterLink = styled.p`
  color: ${cyan400};
  margin: 0 0 0 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default class SignUp extends React.Component {
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
              marginRight: 20,
              height: 70,
              width: 70,
            }}
          />
          <h2
            style={{
              color: grey800,
            }}
          >
            Register to Emergence
          </h2>
        </div>

        <form
          style={{
            marginBottom: 40,
          }}
        >
          <TextField
            floatingLabelText="Your full name"
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Your email"
            fullWidth={true}
          />

          <RaisedButton
            label="Sign Me Up"
            primary={true}
            fullWidth={true}
          />
        </form>

        <RegisterLink
          onClick={this._changeModal.bind(this)}
        >
          Already have an account? Sign in.
        </RegisterLink>
      </div>
    )
  }
  _changeModal() {
    this.props.openLoginModal()
    this.props.closeThisModal()
  }
}
