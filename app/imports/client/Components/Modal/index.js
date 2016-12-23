/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import {
  white,
	grey600,
} from 'material-ui/styles/colors'

export default class Modal extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
    }
  }
  propTypes: {
    isOpen: React.PropTypes.boolean.isRequired,
  }
  componentWillReceiveProps({ isOpen }) {
    this.setState({ isOpen })
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: 'white',
          display: this.state.isOpen ? 'block' : 'none',
          height: '100vh',
          left: 0,
          opacity: 0.95,
          position: 'fixed',
          top: 0,
          transition: '0.5s',
          width: '100vw',
          zIndex: 1000,
        }}
      >
      <ClearIcon
        color={grey600}
        style={{
          height: 30,
          position: 'absolute',
          right: 20,
          top: 10,
          width: 30,
        }}
        onClick={this._closeModal.bind(this)}
      />
      </div>
    )
  }
  _closeModal() {
    this.setState({
      isOpen: false,
    })
  }
}
