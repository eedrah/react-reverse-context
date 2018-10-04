import React from 'react'

import { createReverseContext } from 'react-reverse-context'

const { Consumer, Provider } = createReverseContext()

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = { value: 'lightblue' }
  }
  handleSelect(e) {
    this.setState({ value: e.target.value })
  }
  render() {
    return (
      <React.Fragment>
        <Provider value={this.state.value} />
        <p>Choose the background color of my parent:</p>
        <input onChange={this.handleSelect} value={this.state.value} />
      </React.Fragment>
    )
  }
}

export default () => (
  <Consumer>
    {value => (
      <div
        style={{
          backgroundColor: value,
          height: '100%',
          width: '100%',
          position: 'absolute',
          textAlign: 'center',
        }}
      >
        <Selector />
        <p>You chose: {value}</p>
        <p>
          This was passed up the React tree to the parent consumer, and then fed
          back down the tree via the render prop to whoever wants to consume it.
        </p>
        <p>
          In this simple example it is probably better to just pass a callback
          down one level as a prop. But as the React tree gets more complicated
          with more levels it is nicer to use this ReverseContext API, in a
          similar way that you will use the Context API when passing things down
          multiple levels.
        </p>
      </div>
    )}
  </Consumer>
)
