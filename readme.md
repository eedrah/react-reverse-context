# react-reverse-context
![npm](https://img.shields.io/npm/v/react-reverse-context.svg)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-reverse-context.svg)
![NpmLicense](https://img.shields.io/npm/l/react-reverse-context.svg)
![GitHub issues](https://img.shields.io/github/issues/eedrah/react-reverse-context.svg)

React's Context API is great. It allows us to pass an object down the react tree to any level that requests it. But do you wish sometimes to pass something up? Go in the reverse direction? Reverse Context can help.

## Demo, ideas, and example usage
A simple demo is [available here.](https://eedrah.github.io/react-reverse-context)

You might like to use Reverse Context for the following:
- Sometimes the content of a sidebar (defined near the root element of an app) should depend on deeply nested child components.
- As a substitute to passing down callbacks through props several levels of the tree.
- Display a modal higher up the tree. (Although don't forget about using [react-modal](https://github.com/reactjs/react-modal) for this.)
- Display a component in a completely different location to where it would appear if rendered normally.

Here's a very simple example of usage:
```
import { createReverseContext } from 'react-reverse-context'

const { Consumer, Provider } = createReverseContext()
export default () => (
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
```

which will render:
```
<div className="container">
    <div className="beside" />
    <div className="content">foo</div>
</div>
```

That is, even though the value `foo` is given inside the `beside` `div`, it appears outside/above it, in the `content` `div`.

## Install
```
$ npm install --save react-reverse-context
# or
$ yarn add react-reverse-context
```

## API
The API is exactly the same as the React Context API, except for the following differences:
- The Consumer must be the parent of the Provider
- There can be multiple Providers. They all send their values to the consumer in the order they are instanciated, so that means the last created Provider has the final value.

The key differences from the React docs are italicized below.

### const { Provider, Consumer } = createReverseContext([defaultValue])
Creates a { Provider, Consumer } pair. When React renders a context Consumer, it will read the current context value from a Provider *below* it in the tree.

The defaultValue argument is used by a Consumer when it does not have a matching Provider *below* it in the tree, *and on the initial render*.

#### `<Provider value={/* some value */}>`
Accepts a value prop to be passed to the Consumer that are *parents* of this Provider. *One Consumer can be connected to many Providers, and the last rendered Provider is the final consumed value.* *A Provider cannot have children.*

#### `<Consumer>{value => /* render something based on the context value */}</Consumer>`
A React component that subscribes to context changes. Requires a function as a child. The function receives the current context value and returns a React node. The value argument passed to the function will be equal to the value prop of the *last rendered* Provider for this context *below* in the tree. If there is no Provider for this context *below*, the value argument will be equal to the defaultValue that was passed to createReverseContext().

### Minor notes and tips
- Depending on how you are using it, it is a very good idea to define a default value. The default value is always used before the providers send their values. This may be only milliseconds in some cases, but it still might break your app.
- The `Provider` component does not render anything, nor uses children.
- It is important to not enter a render loop. If your app enters a loop, check that **all** your render functions between the Consumer and Providers are simple functions of props and state. They should not be creating new react classes in the render function. Pay specific attention to the Functional Components, as it is easy to forget these and be creating and consuming new classes every time you render. Essentially, you need to make sure that when the Consumer receives the value it doesn't create a new Provider (which will send another value causing a loop). If you are still having problems, create an issue with a simple example of your problem.

## Alternatives
This was made as a simpler alternative to the following, but you might like the more complete alternatives:

- [Official React portals](https://github.com/tajo/react-portal) - Render an element to a DOM node. Can render outside the root component but restricted to DOM nodes.
- [react-portal](https://github.com/tajo/react-portal) - A component for the above React portal API
- [react-slot-fill](https://github.com/camwest/react-slot-fill) - Define a slot by a name and in another place you can define something to fill it. More powerful but more boilerplate and works on magic strings (or you can use Symbols).

## License
MIT © [Eedrah](http://github.com/eedrah)
