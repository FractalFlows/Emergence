/*
 * Built by Astrocoders
 * @flow
 */

import React, { Component, PropTypes } from 'react'
import {
  Animated,
  Text,
  View,
} from 'react-native'

type Props = {
  message: string,
  style?: { [prop:string]: any },
  textStyle?: { [prop:string]: any },
  offset: number,
}

export default class WarnItem extends Component {
  static propTypes = {
    message: PropTypes.string,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
    offset: PropTypes.number,
  }

  static defaultProps = {
    offset: 0,
  }

  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable react/sort-comp */

  constructor(props: Props) {
    super(props)

    this.warnStyles = {
      height: 40,
      marginTop: new Animated.Value(this.getMarginTop()),
    }
  }

  componentDidMount() {
    Animated.timing(this.warnStyles.marginTop, {
      toValue: 0,
    }).start()
  }

  getMarginTop():number {
    return -(this.props.offset + 40)
  }

  warnStyles:{
    [prop:string]: any,
  } = {}

  render() {
    const { warnStyles } = this
    return (
      <Animated.View
        style={[warnStyles, {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          backgroundColor: 'red',
        }, this.props.style]}
      >
        <Text
          style={[{
            color: 'white',
          }, this.props.textStyle]}
        >
          {this.props.message}
        </Text>
      </Animated.View>
    )
  }
}
