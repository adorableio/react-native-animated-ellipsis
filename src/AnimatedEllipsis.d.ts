declare module 'react-native-animated-ellipsis' {
    import { StyleProp, TextStyle } from 'react-native';

    interface AnimatedEllipsisProps {
        /**
         * The number of dots you'd like to show. Defaults to 3.
         */
        numberOfDots?: number;
        /**
         * The length in milliseconds of each phase of the animated. Defaults to 300.
         */
        animationDelay?: number;
        /**
         * The minimum opacity for the dots. Defaults to 0.
         */
        minOpacity?: number;
        /**
         * CSS to apply to the dots. It accepts any styles that a normal <Text /> component can take.
         */
        style?: StyleProp<TextStyle>;
        /**
         * Whether to use the native driver for the animation. Defaults to false.
         */
        useNativeDriver?: boolean;
    }

    /**
     * A simple, customizable animated dots component for use in React Native apps. Ideal for loading screens.
     */
    const AnimatedEllipsis: React.FC<AnimatedEllipsisProps>;

    export default AnimatedEllipsis;
}