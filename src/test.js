import React from 'react'
import renderer from 'react-test-renderer'

import { createReverseContext } from '.'
import ExampleApp from '../example/src/App.js'

test('it renders the default when not given a Provider', () => {
  const { Consumer } = createReverseContext('default')
  const tree = renderer.create(<Consumer>{a => a}</Consumer>).toJSON()
  expect(tree).toMatchInlineSnapshot(`"default"`)
})

test('it renders the value that is given to the Provider', () => {
  const { Consumer, Provider } = createReverseContext()
  const tree = renderer
    .create(
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
    .toJSON()
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
  const tree = renderer
    .create(
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
    .toJSON()
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

test('it renders the example app correctly', () => {
  const tree = renderer.create(<ExampleApp />).toJSON()
  expect(tree).toMatchInlineSnapshot(`
<div
  style={
    Object {
      "backgroundColor": "lightblue",
      "height": "100%",
      "position": "absolute",
      "textAlign": "center",
      "width": "100%",
    }
  }
>
  <p>
    Choose the background color of my parent:
  </p>
  <input
    onChange={[Function]}
    value="lightblue"
  />
  <p>
    You chose: 
    lightblue
  </p>
  <p>
    This was passed up the React tree to the parent consumer, and then fed back down the tree via the render prop to whoever wants to consume it.
  </p>
  <p>
    In this simple example it is probably better to just pass a callback down one level as a prop. But as the React tree gets more complicated with more levels it is nicer to use this ReverseContext API, in a similar way that you will use the Context API when passing things down multiple levels.
  </p>
</div>
`)
})
