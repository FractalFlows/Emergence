// @flow
import React from 'react'
import {
  Picker,
} from 'react-native'
import {
  find,
  get,
  omit,
} from 'lodash/fp'
import {
  Text,
  View,
  TextInput,
  DropDownMenu,
  Row,
} from '@shoutem/ui'

function renderError({ touched, error }) {
  const saying = (
    <Text
      style={{
        color: 'red',
        paddingLeft: 5,
      }}
    >
      *{error}
    </Text>
  )

  return touched && error ? saying : null
}

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
    props.options ? (
      <View
        styleName="vertical"
        style={{
          paddingLeft: 10,
        }}
      >
        <Text>
          {props.label}
        </Text>
        <Picker
          onValueChange={value => input.onChange(value)}
          selectedValue={get('value', find(({ value }) => value === input.value, props.options)) || props.defaultValue}
          mode="dropdown"
        >
          {
            props.options.map(option => (
              <Picker.Item key={option.value} {...option}/>
            ))
          }
        </Picker>
        {renderError(meta)}
      </View>
    ) : (
      <View
        style={{
          paddingVertical: 5,
        }}
      >
        <TextInput
          {...input}
          {...props}
          value={input.value || props.defaultValue}
          returnKeyType="next"
        />
        {renderError(meta)}
      </View>
    )
  )
}
