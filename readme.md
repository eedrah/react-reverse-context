# react-reverse-context

React's Context API is great. It allows us to pass an object down the react tree to any level that requests it. But do you wish sometimes to pass something up? Go in the reverse direction? Reverse Context can help.

## Install
```
$ npm install --save react-reverse-context
# or
$ yarn add react-reverse-context
```

## API and Usage
The API is exactly the same as the React Context API, except for the following differences:
- The Consumer must be the parent of the Provider
- There can be multiple Providers

```
import {createReverseContext} from 'react-reverse-context'
const {Consumer, Provider} = createReverseContext()
```

### Minor notes and tips
- Depending on how you are using it, it is a very good idea to define a default value. The default value is always used before the providers send their values. This may be only milliseconds in some cases, but it still might break your app.
- The `Provider` component does not render anything, nor uses children.

## Example usage
Sometimes the content of a sidebar (defined near the root element of an app) should depend on deeply nested child components.

## Alternatives
This was made as a simpler alternative to the following, but you might like the more complete alternatives:

- [Official React portals](https://github.com/tajo/react-portal) - Render an element to a DOM node. Can render outside the root component but restricted to DOM nodes.
- [react-portal](https://github.com/tajo/react-portal) - A component for the above React portal API
- [react-slot-fill](https://github.com/camwest/react-slot-fill) - Define a slot by a name and in another place you can define something to fill it. More powerful but more boilerplate and works on magic strings (or you can use Symbols).

## License
MIT © [Eedrah](http://github.com/eedrah)
