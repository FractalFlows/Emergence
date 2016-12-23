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
          display: this.props.isOpen ? 'block' : 'none',
        }}
      >
        Um texto qualquer, só algo aleatório
      </div>
    )
  }
}
