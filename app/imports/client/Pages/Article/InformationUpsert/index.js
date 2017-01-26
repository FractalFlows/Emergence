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
  MenuItem,
} from 'material-ui'
import {
  TextField,
  SelectField,
} from 'redux-form-material-ui'

// Components
import renderField from '/imports/client/Components/Form/renderField'
import Error from '/imports/client/Components/Error'
import ModalTitle from '/imports/client/Components/ModalTitle'

// Helpers
import validateObject from '/imports/client/Utils/validateObject'

// Containers
import ArticleContainer from '../container'

function InformationUpsert({
  submitting,
  slug,
  location: {
    state = {},
  },
  onSubmit,
  handleSubmit,
  error,
}){
  const information = state.information || {}
  const isEdit = state.isEdit

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
        <ModalTitle>
          Save Knowledge Bit
        </ModalTitle>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-name="form-knowledgeBit"
      >
        <Field
          name="type"
          component={SelectField}
          floatingLabelText="What is the type of the Knowledge Bit?"
          fullWidth
        >
          <MenuItem
            value="github"
            primaryText="Github"
          />
          <MenuItem
            value="pdf"
            primaryText="PDF source"
          />
        </Field>

        <Field
          name="link"
          component={TextField}
          floatingLabelText="What is the link of it?"
          disabled={isEdit}
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
    form: 'informationUpsert',
  }),
  withProps(({ params, location, router }) => ({
    onSubmit(values){
      return new Promise((resolve, reject) => {
        // Validate the data first
        const syncValidationErrors = validateObject({
          link: {
            type: SimpleSchema.RegEx.Url,
          },
          type: {
            type: String,
          },
        }, values)

        if(!isEmpty(syncValidationErrors)){
          return reject(new SubmissionError(syncValidationErrors))
        }

        Meteor.call('article/informationUpsert', {
          articleSlug: params.slug,
          information: values,
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
      this.props.initialize(get('information', this.props.location.state))
    }
  }),
  ArticleContainer,
  pure,
)(InformationUpsert)
