import React, {
  PropTypes,
} from 'react'
import {
  compose,
  pure,
  withProps,
  withState,
} from 'recompose'
import { isEmpty } from 'lodash/fp'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import {
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import {
	RaisedButton,
} from 'material-ui'

import Error from '/imports/client/Components/Error'
import FooterColumn from './FooterColumn'
import FooterTitle from './FooterTitle'
import validateObject from '/imports/client/Utils/validateObject'

function MailingListForm({ onSubmit, handleSubmit, submitting, error, wasSent }){
  return (
    <FooterColumn>
      <FooterTitle>
        Interested in what we're doing? Join our mailing list.
      </FooterTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          component={TextField}
          floatingLabelText="Name"
        />
        <br />
        <Field
          name="email"
          component={TextField}
          floatingLabelText="Email"
        />

        <br />
        <br />
        {error && <Error>error</Error>}
        { wasSent && <div>Thanks! We'll be in touch.</div> }
        <RaisedButton
          label="Sign Me Up!"
          type="submit"
          disabled={submitting}
          primary
        />
      </form>
    </FooterColumn>
  )
}

export default compose(
  reduxForm({
    form: 'homeMailingList',
  }),
  withState('wasSent', 'setWasSent', false),
  withProps(({ reset, setIsSent }) => ({
    onSubmit(values){
      return new Promise((resolve, reject) => {
        // Validate the data first
        const syncValidationErrors = validateObject({
          email: {
            type: SimpleSchema.RegEx.Email,
          },
          name: {
            type: String,
          },
        }, values)

        if(!isEmpty(syncValidationErrors)){
          return reject(new SubmissionError(syncValidationErrors))
        }

        Meteor.call('users/addToMailingList', values, error => {
          if(error){
            return reject(new SubmissionError({_error: error.reason}))
          }

          reset()
          resolve()
          setWasSent(true)
        })
      })
    },
  })),
  pure,
)(MailingListForm)
