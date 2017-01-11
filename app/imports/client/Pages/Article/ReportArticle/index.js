import React from 'react'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import {
  RaisedButton,
  TextField,
} from 'material-ui'
import {
  grey400,
  grey800,
} from 'material-ui/styles/colors'

export default function ReportArticle(){
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
      >
        <TextField
          hintText="This article contains a summary that does not fits with the essence of the article, contains graphic content, unappropriated language"
          multiLine={true}
          rows={2}
          rowsMax={6}
          fullWidth={true}
        />
        <RaisedButton
          label="Confirm"
          primary={true}
          fullWidth={true}
        />
      </form>
    </div>
  )
}
