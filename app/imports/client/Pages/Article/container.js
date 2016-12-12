/*
 * Built by Astrocoders
 * @flow
 */

import { connect } from 'react-redux'
import * as actionsToProps from './actions'

const stateToProps = ({ article }) => ({ article })

export default connect(stateToProps, actionsToProps)
