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
import SwipeableViews from 'react-swipeable-views';
import {
  white,
  cyan400,
  grey400,
  grey700,
} from 'material-ui/styles/colors'

//Components
import Users from './users'
import Articles from './articles'

//Styled Components
const TabsList = styled(Tabs)`
  margin: 0 2px;
  box-shadow: -1px 1px 2px ${grey400};

  & > div:nth-child(2) div {
    background-color: ${cyan400} !important;
  }
`
const TabItem = styled(Tab)`
  background-color: ${white} !important;
  color: ${grey700} !important;

  &:hover {

  }
`

//Disguise the StyledComponent components as MaterialUI Tab components
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
          <TabsList
            onChange={this._handleTabChange.bind(this)}
            value={this.state.slideIndex}
          >
            <TabItem label="Users" value={0} />
            <TabItem label="Articles" value={1} />
          </TabsList>

          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <Users />
            <Articles />
          </SwipeableViews>
        </div>
		  </div>
		)
	}

  _handleTabChange(value) {
    this.setState({ slideIndex: value })
  }
}
