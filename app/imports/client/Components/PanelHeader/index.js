/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import {
	grey100,
  grey300,
	grey600,
} from 'material-ui/styles/colors'

export default function PanelHeader(props) {
  return (
    <div
      style={{
        backgroundColor: grey100,
        width: '100%',
        borderBottom: `1px solid ${grey300}`,
        padding: '10px 15px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          color: grey600,
          margin: 0,
          fontSize: 16,
          fontWeight: 200,
          flexGrow: 9999,
        }}
      >
        {props.title}
      </h2>

      <div>
        {props.children}
      </div>
    </div>
  )
}
