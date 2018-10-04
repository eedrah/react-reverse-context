import React from 'react'
import { func, any, object } from 'prop-types'

class InnerReverseProvider extends React.Component {
  constructor(props) {
    super(props)
    props.setValue(props.value)
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      nextProps.setValue(nextProps.value)
    }
    return false
  }
  render() {
    return null
  }
}
InnerReverseProvider.propTypes = {
  setValue: func.isRequired,
  value: any.isRequired,
}

const ReverseProvider = ({ value, ContextConsumer }) => (
  <ContextConsumer>
    {setValue => <InnerReverseProvider setValue={setValue} value={value} />}
  </ContextConsumer>
)
ReverseProvider.propTypes = {
  value: any.isRequired,
  // Need a better proptype. See https://github.com/facebook/prop-types/issues/223
  ContextConsumer: object.isRequired,
}

class ReverseConsumer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue,
    }
    this.changeValue = this.changeValue.bind(this)
  }
  changeValue(value) {
    this.setState({ value })
  }
  render() {
    const ContextProvider = this.props.ContextProvider
    return (
      <ContextProvider value={this.changeValue}>
        {this.props.children(this.state.value)}
      </ContextProvider>
    )
  }
}
ReverseConsumer.propTypes = {
  defaultValue: any,
  // Need a better proptype. See https://github.com/facebook/prop-types/issues/223
  ContextProvider: object.isRequired,
  children: func.isRequired,
}

const createReverseContext = defaultValue => {
  const context = React.createContext()

  const Consumer = ({ children }) => (
    <ReverseConsumer
      ContextProvider={context.Provider}
      defaultValue={defaultValue}
    >
      {children}
    </ReverseConsumer>
  )
  Consumer.propTypes = { children: func.isRequired }

  const Provider = ({ value }) => (
    <ReverseProvider ContextConsumer={context.Consumer} value={value} />
  )
  Provider.propTypes = { value: any.isRequired }

  return { Consumer, Provider }
}

export { createReverseContext }
