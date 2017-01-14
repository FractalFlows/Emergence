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

export default class Users extends React.Component {
	render() {
    const users = [
      {
        name: 'John Smith',
        email: 'john.smith@gmail.com',
      },
      {
        name: 'Randal White',
        email: 'randal.white@gmail.com',
      },
      {
        name: 'Stephanie Sanders',
        email: 'stephanie.sanders@gmail.com',
      },
      {
        name: 'Steve Brown',
        email: 'steve.brown@gmail.com',
      },
      {
        name: 'Joyce Whitten',
        email: 'joyce.whitten@gmail.com',
      },
      {
        name: 'Samuel Roberts',
        email: 'samuel.roberts@gmail.com',
      },
      {
        name: 'Adam Moore',
        email: 'adam.moore@gmail.com',
      },
    ]

		return (
			<div
        style={{
          margin: '0 2px 1px 2px',
          boxShadow: `-1px 1px 2px ${grey400}`,
        }}
      >
        <Table

        >
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
            {users.map((row, index) => (
              <TableRow key={index} selected={false}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.email}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
		  </div>
		)
	}
}
