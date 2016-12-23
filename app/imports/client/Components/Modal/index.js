/*
 * Built by Astrocoders
 * @flow
 */

import React from 'react'

export default class Modal extends React.Component {
  propTypes: {
    isOpen: React.PropTypes.boolean.isRequired,
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          display: this.props.isOpen ? 'block' : 'none',
          height: '100vh',
          left: 0,
          postion: 'fixed',
          top: 0,
          width: '100vw',
          zIndex: 1000,
        }}
      >
        Testando
      </div>
    )
  }
}
