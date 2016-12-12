/*
 * Built by Astrocoders
 * @flow
 */

import { connect } from 'react-redux'
import * as actionsToProps from './actions'

const stateToProps = ({ user }) => ({ user })

export default connect(stateToProps, actionsToProps)
