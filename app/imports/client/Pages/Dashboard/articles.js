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
import container from './articlesContainer'

class Articles extends React.Component {
	render() {
    const { articles } = this.props

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
              <TableHeaderColumn tooltip="Title of the article">Title</TableHeaderColumn>
              <TableHeaderColumn tooltip="Authors' Names">Authors</TableHeaderColumn>
              <TableHeaderColumn tooltip="DOI Number">DOI</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            showRowHover={true}
            displayRowCheckbox={false}
          >
            {articles && articles.map((row, index) => (
              <TableRow key={index} selected={false}>
                <TableRowColumn>{row.title}</TableRowColumn>
                <TableRowColumn>{row.authors.join(', ')}</TableRowColumn>
                <TableRowColumn>{row.DOI}</TableRowColumn>
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
)(Articles)
