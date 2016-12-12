import {
  loginInit,
  loginCheck,
  loginError,
  loginSuccess,
  loginClean,
  refreshToken,
  userFetchData,
} from '../actions'
import reducer from '../reducer'

describe('User reducer', () => {
  it('should handle USER_LOGIN_INIT properly', () => {
    const state =  {
      token: false,
      error: false,
      mutationErrors: [],
      loading: false,
    }
    const action = loginInit()

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('should handle USER_LOGIN_SUCCESS properly', () => {
    const state =  {
      token: false,
      error: false,
      mutationErrors: [],
      loading: true,
    }
    const action = loginSuccess({
      token: 'astrocoders_rocks_and_this_is_not_a_secret',
    })

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('should handle USER_LOGIN_CLEAN properly', () => {
    const state =  {
      token: false,
      error: true,
      mutationErrors: [],
      loading: true,
    }
    const action = loginClean()

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('should handle USER_REFRESH_TOKEN properly', () => {
    const state =  {
      token: 'one_token_right_here',
      error: false,
      mutationErrors: [],
      loading: false,
    }
    const action = refreshToken({
      token: 'one_new_token_right_here_also',
    })

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('should handle USER_LOGIN_CHECK properly', () => {
    const state =  {
      token: 'one_token_right_here',
      error: false,
      mutationErrors: [],
      loading: false,
    }
    const action = loginCheck({
      routeName: 'some_neat_route',
    })

    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('should handle USER_FETCH_DATA properly', () => {
    const state =  {
      token: false,
      error: false,
      mutationErrors: [],
      loading: false,
    }
    const action = userFetchData({
      data: {
        id: 'x',
        name: 'Edward Elric',
        level: 'alchemist',
      }
    })

    expect(reducer(state, action)).toMatchSnapshot()
  })
})
