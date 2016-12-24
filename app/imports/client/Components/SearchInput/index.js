/*
 * Built by Astrocoders
 * @flow
 */

//Modules
import React from 'react'
import styled from 'styled-components'
import {
  grey100,
} from 'material-ui/styles/colors'

//Styled Components
const Input = styled.input`
	padding: 15px;
	border: none;
	background-color: ${grey100};
  width: 100%;

	&:focus {
		outline: none;
	}
`

export default class Modal extends React.Component {
  render() {
    return (
      <div>
        <Input
          type="text"
          placeholder="Enter an article DOI, title, author or keywords"
        />
      </div>
    )
  }
}
