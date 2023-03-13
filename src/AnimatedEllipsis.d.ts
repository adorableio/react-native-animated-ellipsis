declare module 'react-native-animated-ellipsis' {
    import { StyleProp, TextStyle } from 'react-native';

    interface AnimatedEllipsisProps {
        numberOfDots?: number;
        animationDelay?: number;
        minOpacity?: number;
        style?: StyleProp<TextStyle>;
        useNativeDriver?: boolean;
    }

    const AnimatedEllipsis: React.FC<AnimatedEllipsisProps>;

    export default AnimatedEllipsis;
}