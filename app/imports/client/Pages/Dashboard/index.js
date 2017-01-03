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
  grey400,
  grey700,
} from 'material-ui/styles/colors'

//Components
import Users from './users'

//Styled Components
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
          <div
            style={{
              boxShadow: `-1px 1px 2px ${grey400}`,
            }}
          >
            <Tabs
              onChange={this._handleTabChange.bind(this)}
              value={this.state.slideIndex}
            >
              <TabItem label="Users" value={0} />
              <TabItem label="Articles" value={1} />
            </Tabs>

            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
            >
              <Users />
            </SwipeableViews>
          </div>
        </div>
		  </div>
		)
	}

  _handleTabChange(value) {
    this.setState({ slideIndex: value })
  }
}
