/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs'
import { RaisedButton } from 'material-ui'
import SwipeableViews from 'react-swipeable-views';
import {
  white,
  grey700,
} from 'material-ui/styles/colors'


const TabItem = styled(Tab)`
  background-color: ${white} !important;
  color: ${grey700} !important;

  &:hover {

  }
`

const ButtonRaisedD = styled(RaisedButton)`
  padding: 50px;
  background-color: #000;
`

//Disguise the StyledComponent TabItem as a MaterialUI Tab component
//*Tabs component requires it
TabItem.muiName = 'Tab'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }
	render() {
		return (
			<div>
        <div
          style={{
            padding: '30px 150px',
          }}
        >
          <Tabs
            onChange={this._handleTabChange.bind(this)}
            value={this.state.slideIndex}
          >
            <TabItem label="Articles" value={0} />
            <TabItem label="Users" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              <h2>Tabs with slide effect</h2>
              Swipe to see the next slide.<br />
            </div>
            <div>
              slide n°2
            </div>
            <div>
              slide n°3
            </div>
          </SwipeableViews>
        </div>
		  </div>
		)
	}

  _handleTabChange(value) {
    this.setState({ slideIndex: value })
  }
}
