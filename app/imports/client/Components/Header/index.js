/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import {
	FontIcon,
	IconMenu,
	IconButton,
	MenuItem,
} from 'material-ui'
import EventSeatIcon from 'material-ui/svg-icons/action/event-seat'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {
	white,
	cyan400,
	grey100,
	grey800,
} from 'material-ui/styles/colors';

export default function Header(props) {
	return (
	  <div>
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
	    	
	    	<input
	    		type="text"
	    		placeholder="Search for"
	    		style={{
	    			padding: 15,
	    			border: 'none',
	    			backgroundColor: grey100,
	    			flexGrow: 100000,
	    		}}
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
	  </div>
	)
}
