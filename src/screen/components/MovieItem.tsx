import { Image, Text, View } from 'react-native';
import { EMPTY_ITEM_SIZE, GAP_ITEM, ITEM_SIZE } from '../../utils/movie-dimensions.ts';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Rating } from './Rating.tsx';
import { Genres } from './Genres.tsx';
import { MovieFormatted } from '../../models/movie.model.ts';

interface MovieItemProps {
    item: MovieFormatted
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
                    marginLeft: index === 0 ? EMPTY_ITEM_SIZE : 0,
                    marginRight: index === moviesLengthMax ? EMPTY_ITEM_SIZE : 0,
                    width: ITEM_SIZE,
                }, animatedStyle]}>
                <Image
                    source={{ uri: item.poster }}
                    className={'rounded-2xl w-full object-cover mb-5'}
                    style={{
                        height: ITEM_SIZE * 1.2,
                    }}
                />
                <View className={'items-center gap-3'}>
                    <Text className={'text-center font-semibold text-2xl'}>{item.title}</Text>
                    <Rating rating={item.rating} />
                    <Genres genres={item.genres} />
                    <Text numberOfLines={5}>{item.description}</Text>
                </View>
            </Animated.View>
        </View>
    )
}
