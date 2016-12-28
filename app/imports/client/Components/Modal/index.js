/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import styled, { keyframes } from 'styled-components'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import {
  white,
  grey800,
} from 'material-ui/styles/colors'

//Animations
const OpacityTransition = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

//Styled Components
const CloseButton = styled.div`
  opacity: .4;

  &:hover {
    opacity: .8;
    cursor: pointer;
  }
`

const Content = styled.div`
  animation: ${OpacityTransition} .5s;
  display: flex;
  height: auto;
  justify-content: center;
  overflow-x: hidden;
  padding: 26.25px 150px;
  width: auto;
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
  }
  render() {
    return this.state.isOpen && (
      <div>
        <div
          style={{
            backgroundColor: white,
            height: '100vh',
            left: 0,
            opacity: .95,
            position: 'fixed',
            top: 0,
            width: '100vw',
            zIndex: 1000,
          }}
        >
        </div>
        <div
          className="modal"
          style={{
            height: '100vh',
            left: 0,
            overflowY: 'auto',
            position: 'fixed',
            top: 0,
            width: '100vw',
            zIndex: 1001,
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
          <Content
            style={{
              ...this.props.style,
            }}
          >
            {this.props.children}
          </Content>
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    if (document.getElementsByClassName('modal')[0]) {
      this._setBodyOverflow('hidden')
    } else {
      this._setBodyOverflow('initial')
    }
  }
  _closeModal() {
    this.props.close()
    this._setBodyOverflow('initial')
  }
  _setBodyOverflow(state) {
    document.body.style.overflowY = state
  }
}
