/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import { View } from '@shoutem/ui'
import WarnItem from './WarnItem'

type Props = {
  show: boolean,
  message: string,
  style?: { [prop:string]: any },
  textStyle?: { [prop:string]: any },
  offset?: number,
}

export default function Warn({ show, ...props }: Props) {
  return (
    <View>
      {
        show &&
        <WarnItem
          {...props}
        />
      }
    </View>
  )
}
