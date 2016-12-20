/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import Header from '../Header'

export default function App(props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}
