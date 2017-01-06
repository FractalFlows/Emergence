/*
 * Built by Astrocoders
 * @flow
 */

import React, {
  PureComponent,
  PropTypes,
} from 'react'
import { isEmpty } from 'lodash'
import { Meteor } from 'meteor/meteor'
import styled from 'styled-components'
import {
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import {
  TextField,
  RaisedButton,
} from 'material-ui'
import EventSeatIcon from 'material-ui/svg-icons/action/event-seat'
import {
	cyan400,
  grey800,
} from 'material-ui/styles/colors'

// Components
import renderField from '/imports/client/Components/Form/renderField'
import Error from '/imports/client/Components/Error'

//Styled Components
const RegisterLink = styled.p`
  color: ${cyan400};
  margin: 0 0 0 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

class SignIn extends PureComponent {
  propTypes: {
    openRegisterModal: PropTypes.func.isRequired,
    closeThisModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool,
  }

  render() {
    const {
      handleSubmit,
      error,
      submitting,
    } = this.props

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
          onSubmit={handleSubmit(this.submitLoginUser.bind(this))}
        >
          <Field
            name="email"
            floatingLabelText="Your email"
            component={renderField}
            fullWidth
          />

          {error ? <Error>{this.humanizeError(error)}</Error> : null}

          <RaisedButton
            label="Sign Me In"
            type="submit"
            disabled={submitting}
            primary
            fullWidth
          />
        </form>

        <RegisterLink
          onClick={this.changeModal.bind(this)}
          data-name="sign-in-register-link"
        >
          Do not have an account yet? Register to start sharing your knowledge now!
        </RegisterLink>
      </div>
    )
  }

  submitLoginUser(values) {
    return new Promise((resolve, reject) => {
      const syncValidationErrors = this.validateSync(values, ['email'])
      if(!isEmpty(syncValidationErrors)){
        return reject(new SubmissionError(syncValidationErrors))
      }

      Meteor.loginWithPassword(values.email, 'defaultpassword', (error) => {
        if(error){
          return reject(new SubmissionError({
            _error: error.reason,
          }))
        }

        this.props.closeThisModal()
      })
    })
  }

  validateSync(values, fields){
    return fields.reduce((errors, field) => {
      if( isEmpty(values[field]) ) return { ...errors, [field]: 'Field can not be empty' }
      else return { ...errors }
    }, {})
  }

  changeModal() {
    this.props.openRegisterModal()
    this.props.closeThisModal()
  }

  humanizeError(error) {
    const cleaned = error.replace('error.accounts.', '')
    return  cleaned === 'Login forbidden' ? 'User not found' : cleaned
  }
}

export default reduxForm({
  form: 'signIn',
})(SignIn)
