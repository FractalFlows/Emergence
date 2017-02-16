import React from 'react'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import {
  compose,
  withProps,
} from 'recompose'
import { isEmpty } from 'lodash/fp'
import validateObject from '/imports/client/Utils/validateObject'
import {
  RaisedButton,
} from 'material-ui'
import {
  grey400,
  grey800,
} from 'material-ui/styles/colors'
import {
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import { TextField } from 'redux-form-material-ui'

function ReportArticle({
  onSubmit,
  submitting,
  handleSubmit,
}){
  return (
    <div
      style={{
        textAlign: 'center',
        width: 500,
      }}
    >
    <WarningIcon
      color={grey400}
      style={{
        height: 70,
        width: 70,
      }}
    />
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: grey800,
          }}
        >
          Report this article
        </h2>
      </div>
      <form
        style={{
          marginTop: 40,
          marginBottom: 40,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          hintText="This article contains a summary that does not fits with the essence of the article, contains graphic content, unappropriated language"
          name="message"
          rows={2}
          rowsMax={6}
          component={TextField}
          fullWidth
          multiLine
        />
        <RaisedButton
          type="submit"
          label="Confirm"
          disabled={submitting}
          primary
          fullWidth
        />
      </form>
    </div>
  )
}

export default compose(
  reduxForm({
    form: 'reportArticle',
  }),
  withProps(({ router, params }) => ({
    onSubmit(values){
      return new Promise((resolve, reject) => {
        const errors = validateObject({
          message: { type: String, min: 20 },
        }, values)

        if(!isEmpty(errors)){
          reject(new SubmissionError(errors))
          return
        }

        Meteor.call('article/report', {
          message: values.message,
          articleSlug: params.slug,
        }, () => {
          router.replace(`/article/${params.slug}`)
          resolve()
        })
      })
    },
  }))
)(ReportArticle)
