import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { CURRENT_USER_QUERY } from '../components/User'
import Me from '../components/Me'
import { fakeUser } from '../testUtils'

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
]

const noDataMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
]
const errorMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      errors: [{ message: 'Items Not Found!' }],
    },
  },
]

describe('<Me/>', () => {
  test('should render correctly when logged in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Me />
      </MockedProvider>,
    )
    await wait(0)
    wrapper.update()
    expect(toJSON(wrapper.find('h2.user'))).toMatchSnapshot()
    expect(toJSON(wrapper.find('h3.email'))).toMatchSnapshot()
    expect(toJSON(wrapper.find('p.balance'))).toMatchSnapshot()
  })

  test('should render error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={errorMocks}>
        <Me />
      </MockedProvider>,
    )
    await wait(0)
    wrapper.update()
    expect(wrapper.find('p').text()).toContain('Items Not Found!')
  })
  test('should present loading state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Me />
      </MockedProvider>,
    )
    expect(wrapper.find('Loading').exists()).toBe(true)
  })
  test('should display correct information when no data is fetched', async () => {
    const wrapper = mount(
      <MockedProvider mocks={noDataMocks}>
        <Me />
      </MockedProvider>,
    )
    await wait(0)
    wrapper.update()
    expect(wrapper.find('p').text()).toContain('We could fetch your information. Check back later')
  })
})