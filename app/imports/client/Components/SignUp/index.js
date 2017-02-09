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
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import {
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import {
  RaisedButton,
} from 'material-ui'
import EventSeatIcon from 'material-ui/svg-icons/action/event-seat'
import {
	cyan400,
  grey800,
  red500,
} from 'material-ui/styles/colors' 
// Components
import SignIn from '/imports/client/Components/SignIn'
import renderField from '/imports/client/Components/Form/renderField'
import Error from '/imports/client/Components/Error'

//Styled Components
const RegisterLink = styled.p`
  color: ${cyan400};
  margin: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

class SignUp extends PureComponent {
  propTypes: {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  render() {
    const { handleSubmit, error } = this.props
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
            Register to Emergence
          </h2>
        </div>

        <form
          style={{
            marginBottom: 40,
          }}
          onSubmit={handleSubmit(this.submitCreateUser.bind(this))}
          data-name="signUp"
        >
          <Field
            name="fullName"
            floatingLabelText="Your full name"
            component={renderField}
            fullWidth
          />
          <Field
            name="email"
            floatingLabelText="Your email"
            component={renderField}
            fullWidth
          />
          {error ? <Error>{error}</Error> : null}

          <RaisedButton
            label="Sign Me Up"
            type="submit"
            disabled={this.props.submitting}
            fullWidth
            primary
          />
        </form>

        <RegisterLink
          onClick={() => this.props.router.goBack()}
        >
          Already have an account? Login.
        </RegisterLink>
      </div>
    )
  }

  submitCreateUser(values) {
    return new Promise((resolve, reject) => {
      const syncValidationErrors = this.validateSync(values, ['email', 'fullName'])
      if(!isEmpty(syncValidationErrors)){
        return reject(new SubmissionError(syncValidationErrors))
      }

      Meteor.call('users/signUp', {
        name: values.fullName,
        email: values.email,
      }, (error) => {
        if(error){
          return reject(new SubmissionError({
            _error: error.reason,
          }))
        }

        Meteor.loginWithPassword(values.email, 'defaultpassword')

        const redirTo = this.props.location.state.redirTo
        console.log(redirTo, this.props.location)
        if(redirTo){
          return this.props.router.replace(redirTo)
        }

        this.props.router.goBack()
      })
    })
  }

  validateSync(values, fields){
    return fields.reduce((errors, field) => {
      if( isEmpty(values[field]) ) return { ...errors, [field]: 'Field can not be empty' }
      else return { ...errors }
    }, {})
  }
}

export default compose(
  reduxForm({
    form: 'signUp',
  }),
  withRouter
)(SignUp)
