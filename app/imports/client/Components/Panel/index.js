/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import {
  white,
	grey400,
} from 'material-ui/styles/colors'

export default function Panel(props) {
  return (
    <div
      style={{
        boxShadow: `-1px 1px 2px ${grey400}`,
        backgroundColor: white,
      }}
    >
      {props.children}
    </div>
  )
}
