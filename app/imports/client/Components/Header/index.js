/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import {
	AppBar,
	IconMenu,
	IconButton,
	MenuItem,
} from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Menu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

export default function Header(props) {
	return (
	  <div>
	    <AppBar
	      title="Emergence"
	      iconElementRight={<Menu />}
	      style={{
	      	paddingLeft: 150,
	      	paddingRight: 150,
	      }}
	    />
	  </div>
	)
}
