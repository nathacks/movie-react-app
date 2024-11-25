import { Image, Text, View } from 'react-native';
import { GAP_ITEM, MOVIE_SIZE, NO_MOVIE_SIZE } from '../../utils/movie-dimensions.ts';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Rating } from './Rating.tsx';
import { Movie } from '../../models/movie.model.ts';
import { getImagePath } from '../../utils/url-image.ts';

interface MovieItemProps {
    item: Movie
    index: number
    scrollX: SharedValue<number>;
    moviesLengthMax: number;
}

export function MovieItem({ item, index, scrollX, moviesLengthMax }: MovieItemProps) {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * GAP_ITEM,
            index * GAP_ITEM,
            (index + 1) * GAP_ITEM,
        ];

        const translateY = interpolate(
            scrollX.value,
            inputRange,
            [100, 50, 100],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY }],
        };
    });

    return (
        <View className={'flex-row'} style={{}}>
            <Animated.View
                className={'mt-14 p-5 bg-sand-1 rounded-t-3xl'}
                style={[{
                    marginLeft: index === 0 ? NO_MOVIE_SIZE : 0,
                    marginRight: index === moviesLengthMax ? NO_MOVIE_SIZE : 0,
                    width: MOVIE_SIZE,
                }, animatedStyle]}>
                <Image
                    source={{ uri: getImagePath(item.poster_path) }}
                    className={'rounded-2xl w-full object-cover mb-5'}
                    style={{
                        height: MOVIE_SIZE * 1.2,
                    }}
                />
                <View className={'items-center gap-3'}>
                    <Text className={'text-center font-semibold text-2xl'}>{item.title}</Text>
                    <Rating rating={item.vote_average} />
                    {/*<Genres genres={item.genres} />*/}
                    <Text numberOfLines={5}>{item.overview}</Text>
                </View>
            </Animated.View>
        </View>
    )
}
