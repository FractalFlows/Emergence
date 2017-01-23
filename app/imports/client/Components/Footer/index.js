/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import {
	white,
	grey700,
} from 'material-ui/styles/colors'

export default function Footer(props) {
  return (
    <div
    	style={{
    		backgroundColor: white,
    		marginTop: 30,
    		padding: '40px 150px',
    		textAlign: 'center',
    	}}
    >
      <p
      	style={{
      		color: grey700,
      		fontSize: 15,
      	}}
      >
      	Copyright © {new Date().getFullYear()} Fractal Flows. All Rights Reserved.
      </p>
    </div>
  )
}
