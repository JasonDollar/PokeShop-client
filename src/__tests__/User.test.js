import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import User, { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser } from '../testUtils'

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
]

describe('<User/>', () => {
  test('should render child component', async () => {
    const Hey = () => <p>Heyyy</p>
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <User>
          {data => <Hey />}
        </User>
      </MockedProvider>,
    )
    await wait(0)
    wrapper.update()
  })
})