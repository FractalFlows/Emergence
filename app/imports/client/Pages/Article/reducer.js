/*
 * Built by Astrocoders
 * @flow
 */

import {
  flow,
  set,
} from 'lodash/fp'

const initialState = {
  article: {},
}

type State = {
  article: {},
}

type Action = {
  type: string,
  payload: { [key: string]: any },
}

export default function inspections(state: State = initialState, { type, payload }: Action): State {
  switch (type) {
    default:
      return state
  }
}
