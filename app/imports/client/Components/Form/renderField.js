// @flow
import React from 'react'
import {
  TextField,
} from 'material-ui'

type Props = {
  input: {
    onChange: () => any,
    onBlur: () => any,
    value: string,
  },
  meta: {
    error: string,
    warning: string,
    touched: bool,
  },
  options: Array<{value: any, label: string}>,
  label: string,
  placeholder: string,
  props: any,
}

export default function renderField({ input, meta, ...props }: Props) {
  return (
    <TextField
      {...input}
      {...props}
      errorText={meta.error}
    />
  )
}
