/*
 * Built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import {
	white,
	grey100,
	grey400,
	grey700,
	grey800,
} from 'material-ui/styles/colors'

//Styled Components
const Dropdown = styled.div`
  position: relative;

	.dropdown-list {
    position: absolute;
    top: calc(100% + 10px);
		right: ${props => props.pullLeft ? '0' : 'initial'};
		visibility: hidden;
		transition: visibility .15s;
		box-shadow: -1px 1px 3px ${grey400};
		background-color: ${white};
		padding: 8px 0;

		a {
			color: ${grey700};
			padding: 8px 20px;
			font-size: 13.5px;
			text-decoration: none;
			float: left;
			min-width: 140px;

			&:hover {
				background-color: ${grey100};
			}
		}
  }

  &:focus {
		outline: none;

		.dropdown-list {
			visibility: visible;
		}
	}
`

const DropdownLabel = styled.div`
	opacity: .6;
	cursor: pointer;
	display: flex;
	alignItems: center;

	&:hover {
		opacity: 1;
	}
`

export default class DropdownMenu extends React.Component {
	propTypes: {

  }
	render() {
		return (
			<Dropdown
				tabIndex={1}
				pullLeft={this.props.pullLeft}
				data-name={this.props.name}
			>
				<DropdownLabel>
					{this.props.label}
				</DropdownLabel>

        <div
          className="dropdown-list"
        >
          {this.props.children}
        </div>
			</Dropdown>
		)
	}
}
