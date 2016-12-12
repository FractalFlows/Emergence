import {
  loginInit,
  loginCheck,
  loginError,
  loginSuccess,
  loginClean,
  refreshToken,
  userFetchData,
} from '../actions'

describe('User actions', () => {
  it('loginInit should create a proper action', () => {
    const action = loginInit()

    expect(action).toMatchSnapshot()
  })

  it('loginSuccess should create a proper action', () => {
    const action = loginSuccess({
      token: 'astrocoders_rocks_and_this_is_not_a_secret',
    })

    expect(action).toMatchSnapshot()
  })

  it('loginCheck should create a proper action', () => {
    const action = loginCheck({
      routeName: 'some_neat_route',
    })

    expect(action).toMatchSnapshot()
  })

  it('loginClean should create a proper action', () => {
    const action = loginClean()

    expect(action).toMatchSnapshot()
  })

  it('refreshToken should create a proper action', () => {
    const action = refreshToken({
      token: 'astrocoders_rocks_and_this_is_not_a_secret',
    })

    expect(action).toMatchSnapshot()
  })

  it('userFetchData should create a proper action', () => {
    const action = userFetchData({
      data: {
        id: 'x',
        name: 'Edward Elric',
        level: 'alchemist',
      }
    })

    expect(action).toMatchSnapshot()
  })
})
