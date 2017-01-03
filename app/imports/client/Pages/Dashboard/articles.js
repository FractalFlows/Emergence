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

export default class Articles extends React.Component {
	render() {
    const articles = [
      {
        title: 'Engineering applications of correlation and spectral analysis',
        authors: ['Bendat, J. S.', 'Piersol, A. G.'],
        DOI: '10.1109/5.771073',
      },
      {
        title: 'Electrospinning of polymeric nanofibers for tissue engineering applications: a review',
        authors: ['Quynh P. Pham', 'Upma Sharma', 'Antonios G. Mikos'],
        DOI: '10.1109/FIE.2000.896576',
      },
      {
        title: 'Survey and critique of techniques for extracting rules from trained artificial neural networks',
        authors: ['Robert Andrews', 'Joachim Diederich', 'Alan B. Tickle'],
        DOI: '10.1109/IE.2014.75',
      },
      {
        title: 'Utility of multimaterial 3D printers in creating models with pathological entities to enhance the training experience of neurosurgeons',
        authors: ['Vicknes Waran', 'Vairavan Narayanan', 'Ravindran Karuppiah', 'Sarah L. F. Owen', 'Tipu Aziz'],
        DOI: '10.3171/2013.11.JNS131066',
      },
      {
        title: 'New Landscapes and New Eyes: The Role of Virtual World Design for Supply Chain Education',
        authors: ['Theo J. Bastiaens', 'Lincoln C. Wood', 'Torsten Reiners'],
        DOI: '10.1109/TC.2002.100914',
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
          multiSelectable={true}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="Title of the article">Title</TableHeaderColumn>
              <TableHeaderColumn tooltip="Authors' Names">Authors</TableHeaderColumn>
              <TableHeaderColumn tooltip="DOI Number">DOI</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            showRowHover={true}
          >
            {articles.map((row, index) => (
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
