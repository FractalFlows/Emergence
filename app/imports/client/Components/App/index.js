/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

export default function App(props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
