import { GAP_ITEM } from '../../utils/movie-dimensions.ts';
import { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

export function movieItemAnimated(index: number, scrollX: SharedValue<number>) {
    const movieRange = [
        (index - 1) * GAP_ITEM,
        index * GAP_ITEM,
        (index + 1) * GAP_ITEM,
    ];

    const animatedMovieText = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollX.value,
            movieRange,
            [.3, 1, .3],
            Extrapolation.CLAMP
        );

        return { opacity }
    })

    const animatedMoviePosition = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollX.value,
            movieRange,
            [70, 0, 70],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY }],
        };
    });

    return {
        animatedMovieText, animatedMoviePosition
    }
}
