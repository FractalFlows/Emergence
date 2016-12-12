/*
 * Built by Astrocoders
 * @flow
 */

const initialState = {

}

type State = {
}

type Action = {
  type: string,
  payload: any,
}

export default function user(state:State = initialState, { type, payload }:Action):State {
  switch (type) {
    default:
      return state
  }
}
