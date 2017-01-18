/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { grey400 } from 'material-ui/styles/colors'
import { compose } from 'recompose'

//Components
import container from './usersContainer'

class Users extends React.Component {
	render() {
    const { users } = this.props

		return (
			<div
        style={{
          margin: '0 2px 1px 2px',
          boxShadow: `-1px 1px 2px ${grey400}`,
        }}
      >
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Email">Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            showRowHover={true}
            displayRowCheckbox={false}
          >
            {users && users.map((row, index) => (
              <TableRow key={index} selected={false}>
                <TableRowColumn>{row.profile.firstName}</TableRowColumn>
                <TableRowColumn>{row.emails[0].address}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
		  </div>
		)
	}
}

export default compose(
  container
)(Users)
