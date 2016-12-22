/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import EventSeatIcon from 'material-ui/svg-icons/action/event-seat'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {
	white,
	cyan400,
	grey100,
	grey800,
} from 'material-ui/styles/colors'


//Styled Components
const Input = styled.input`
	padding: 15px;
	border: none;
	background-color: ${grey100};
	flex-grow: 100000;

	&:focus
		outline: none;

	@media only screen and (max-device-width: 780px) {
		display: none;
	}
`

export default function Header(props) {
	return (
    <div
      style={{
      	padding: '7px 150px',
      	backgroundColor: white,
      	borderBottom: '1px solid #c5cfdc',
      	display: 'flex',
      	alignItems: 'center',
      }}
    >
    	<EventSeatIcon
    		color={cyan400}
    		style={{
    			marginRight: 20,
    			height: 40,
    			width: 40,
    		}}
    	/>
    	
    	<Input
    		type="text"
    		placeholder="Enter an article DOI or keywords"
    	/>

    	<p
    		style={{
    			marginLeft: 50,
    			color: grey800,
    		}}
    	>
    		Login
    	</p>
    </div>
	)
}
