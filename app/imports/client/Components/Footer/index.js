/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import {
	white,
	grey700,
} from 'material-ui/styles/colors'
import FooterWrapper from './Wrapper'

export default function Footer(props) {
  return (
    <FooterWrapper>
      <p
      	style={{
      		color: grey700,
      		fontSize: 15,
      	}}
      >
      	Copyright © {new Date().getFullYear()} Fractal Flows. All Rights Reserved.
      </p>
    </FooterWrapper>
  )
}
