/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import {
  white,
  grey100,
  grey200,
  grey300,
  grey400,
	grey600,
} from 'material-ui/styles/colors'
import styled from 'styled-components'

//Panel wrapper
function Panel(props) {
  return (
    <div
      style={{
        boxShadow: `-1px 1px 2px ${grey400}`,
        backgroundColor: white,
        marginBottom: 30,
      }}
    >
      {props.children}
    </div>
  )
}

//Panel header
function PanelHeader(props) {
  return (
    <div
      style={{
        backgroundColor: grey100,
        width: '100%',
        borderBottom: `1px solid ${grey300}`,
        padding: '10px 15px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          color: grey600,
          margin: 0,
          fontSize: 15,
          fontWeight: 200,
          flexGrow: 9999,
        }}
      >
        {props.title}
      </h2>

      <div>
        {props.children}
      </div>
    </div>
  )
}

//Panel body
function PanelBody(props) {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      {props.children}
    </div>
  )
}

const PanelHeaderButton = styled.button`
  backgroundColor: ${grey200};
  color: ${grey600};
  border: 1px solid ${grey300};
  padding: 7px 10px;
  borderRadius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${grey300};
  }
`

export {
  Panel,
  PanelHeader,
  PanelBody,
  PanelHeaderButton,
}
