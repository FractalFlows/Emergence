/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import {
  white,
	grey100,
  grey300,
	grey400,
	grey600,
} from 'material-ui/styles/colors'

export default function Panel(props) {
  return (
    <div
      style={{
        boxShadow: `-1px 1px 2px ${grey400}`,
        backgroundColor: white,
      }}
    >
      {
        props.title ?
          <div
            style={{
              backgroundColor: grey100,
              width: '100%',
              borderBottom: `1px solid ${grey300}`
            }}
          >
            <h2
              style={{
                color: grey600,
                margin: 0,
                padding: '10px 15px',
                fontSize: 16,
                fontWeight: 200,
              }}
            >
              {props.title}
            </h2>
          </div> : null

      }

      <div
        style={{
          padding: 20,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
