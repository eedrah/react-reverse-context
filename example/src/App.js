import React from 'react'

import { createReverseContext } from 'react-reverse-context'

const { Consumer, Provider } = createReverseContext()

export default class App extends React.Component {
  render() {
    return (
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
  }
}
