# React Native Animated Ellipsis
A simple, customizable animated dots component for use in React Native apps. Ideal for loading screens.

## Installation
```shell
npm install --save react-native-animated-ellipsis
```

## Importing
```js
import AnimatedEllipsis from 'react-native-animated-ellipsis';
```

## Usage
Just include the component in the output of any other component like this:

```jsx
render() {
  return (
    <View>
      Loading
      <AnimatedEllipsis />
    </View>
  );
}
```

which will get you something like this:

(gif)


## Props
Customize the number of dots, animation speed, and style using these props:

| Property | Description |
|----------|-------------|
| **`numberOfDots`** | The number of dots you'd like to show. Defaults to **3**. |
| **`animationDelay`** | The length in milliseconds of each phase of the animated. Defaults to **300**. |
| **`style`** | CSS to apply to the dots. It accepts any styles that a normal `<Text />` component can take. |


## More Examples
```jsx
<AnimatedEllipsis numberOfDots={10} />
```jsx

(gif)


```jsx
<AnimatedEllipsis numberOfDots={5}
                  animationDelay={700}
                  style={{
                    color: 'red',
                    fontSize: 72,
                  }}
/>
```

(gif)
