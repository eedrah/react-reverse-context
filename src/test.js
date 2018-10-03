import React from 'react'
import renderer from 'react-test-renderer'

import { createReverseContext } from '.'

test('it renders the default when not given a Provider', () => {
  const { Consumer } = createReverseContext('default')
  const component = renderer.create(<Consumer>{a => a}</Consumer>)
  let tree = component.toJSON()
  expect(tree).toMatchInlineSnapshot(`"default"`)
})

test('it renders the value that is given to the Provider', () => {
  const { Consumer, Provider } = createReverseContext()
  const component = renderer.create(
    <Consumer>
      {value => (
        <div className="container">
          <div className="beside">
            <Provider value="foo" />
          </div>
          <div className="content">{value}</div>
        </div>
      )}
    </Consumer>
  )
  let tree = component.toJSON()
  expect(tree).toMatchInlineSnapshot(`
<div
  className="container"
>
  <div
    className="beside"
  />
  <div
    className="content"
  >
    foo
  </div>
</div>
`)
})

test('it renders successfully even with multiple Providers', () => {
  const { Consumer, Provider } = createReverseContext()
  const component = renderer.create(
    <Consumer>
      {value => (
        <div className="container">
          <div className="beside">
            <Provider value="foo" />
            <Provider value="bar" />
          </div>
          <div className="content">{value}</div>
        </div>
      )}
    </Consumer>
  )
  let tree = component.toJSON()
  expect(tree).toMatchInlineSnapshot(`
<div
  className="container"
>
  <div
    className="beside"
  />
  <div
    className="content"
  >
    bar
  </div>
</div>
`)
})
