import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { Home } from '../index'

describe('<Home />', () => {
  it('Screen should render', () => {
    // Shallow rendering
    const output = shallow(
      <Home />
    )

    // Snapshot testing
    expect(shallowToJson(output)).toMatchSnapshot()
  })
})
