/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import styled from 'styled-components'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import {
  grey100,
  grey800,
} from 'material-ui/styles/colors'

const CloseButton = styled.div`
  opacity: .4;
  transition: .1s;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`

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
    this._setBodyOverflow(isOpen ? 'hidden' : 'initial')
  }
  render() {
    return this.state.isOpen && (
      <div
        style={{
          backgroundColor: grey100,
          height: '100vh',
          left: 0,
          opacity: .95,
          position: 'fixed',
          top: 0,
          transition: '0.5s',
          width: '100vw',
          zIndex: 1000,
        }}
      >
        <CloseButton>
          <ClearIcon
            color={grey800}
            style={{
              height: 30,
              position: 'fixed',
              right: 30,
              top: 20,
              width: 30,
            }}
            onClick={this._closeModal.bind(this)}
          />
        </CloseButton>
        <div
          style={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
  _closeModal() {
    this.setState({
      isOpen: false,
    })
    this._setBodyOverflow('initial')
  }
  _setBodyOverflow(state) {
    document.body.style.overflowY = state
  }
}
