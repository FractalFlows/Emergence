/*
 * Built by Astrocoders
 * @flow
 */

import React, { PropTypes }  from 'react'
import { withRouter } from 'react-router'
import styled, { keyframes } from 'styled-components'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import {
  white,
  grey800,
} from 'material-ui/styles/colors'
import { once } from 'lodash'

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
  padding: 2vh 10vw;
  width: auto;
`

class Modal extends React.PureComponent {
  componentWillMount(prevProps) {
    this.setBodyOverflow('hidden')
  }

  componentWillUnmount(){
    this.setBodyOverflow('initial')
  }

  render() {
    return (
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
              onClick={this.closeModal}
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

  closeModal = once(() => {
    this.props.router.goBack
  })

  setBodyOverflow(state) {
    document.body.style.overflowY = state
  }
}

export default withRouter(Modal)
