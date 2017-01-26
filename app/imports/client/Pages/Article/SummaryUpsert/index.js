import React from 'react'
import {
  pure,
  compose,
  withProps,
  lifecycle,
} from 'recompose'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import {
  get,
  isEmpty,
} from 'lodash/fp'
import {
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import {
  RaisedButton,
} from 'material-ui'
import {
  TextField,
} from 'redux-form-material-ui'

// Components
import renderField from '/imports/client/Components/Form/renderField'
import Error from '/imports/client/Components/Error'
import ModalTitle from '/imports/client/Components/ModalTitle'

// Helpers
import validateObject from '/imports/client/Utils/validateObject'

// Containers
import ArticleContainer from '../container'

function SummaryUpsert({
  submitting,
  slug,
  location: {
    state = {},
  },
  onSubmit,
  handleSubmit,
  error,
}){
  const summary = state.summary || {}

  return (
    <div
      style={{
        width: '70%',
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <ModalTitle>
          Save Summary
        </ModalTitle>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-name="form-articleSummary"
      >
        <Field
          name="content"
          component={TextField}
          floatingLabelText="Write here your summary"
          rows={2}
          rowsMax={20}
          multiLine
          fullWidth
        />

        { error && <Error>{error}</Error>}

        <RaisedButton
          label="Save"
          type="submit"
          disabled={submitting}
          fullWidth
          primary
        />
      </form>
    </div>
  )
}

export default compose(
  reduxForm({
    form: 'summaryUpsert',
  }),
  withProps(({ params, location, router }) => ({
    onSubmit(values){
      return new Promise((resolve, reject) => {
        // Validate the data first
        const syncValidationErrors = validateObject({
          content: {
            type: String,
          },
        }, values)

        if(!isEmpty(syncValidationErrors)){
          return reject(new SubmissionError(syncValidationErrors))
        }

        Meteor.call('article/summaryUpsert', {
          articleSlug: params.slug,
          summary: values,
        }, error => {
          if(error){
            return reject(new SubmissionError({_error: error.reason}))
          }

          resolve()
          // Get back to the article
          router.goBack()
        })
      })
    },
  })),
  lifecycle({
    componentWillMount(){
      this.props.initialize(get('summary', this.props.location.state))
    }
  }),
  ArticleContainer,
  pure,
)(SummaryUpsert)
