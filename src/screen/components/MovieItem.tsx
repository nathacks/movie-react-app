import { Pressable, Text, View } from 'react-native';
import { MOVIE_SIZE, NO_MOVIE_SIZE } from '../../utils/movie-dimensions.ts';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Rating } from './Rating.tsx';
import { Movie } from '../../models/tmdb.model.ts';
import { getImagePath } from '../../utils/url-image.ts';
import { movieItemAnimated } from '../../hooks/animated/movieItem.animated.ts';
import FastImage from 'react-native-fast-image';
import { StyleShadow } from '../../constants/shadow.ts';
import { useToastStore } from '../../store/toastStore.ts';

interface MovieItemProps {
    movie: Movie
    index: number
    scrollX: SharedValue<number>;
    moviesLengthMax: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function MovieItem({ movie, index, scrollX, moviesLengthMax }: MovieItemProps) {
    const { animatedMovieText, animatedMoviePosition } = movieItemAnimated(index, scrollX)
    const { showToast, toast, closeToast } = useToastStore()

    const backgroundPlacement: Record<number, string> = {
        0: 'bg-amber-4',
        1: 'bg-gray-5',
        2: 'bg-bronze-7',
    }


    return (
        <AnimatedPressable
            onPress={() => {
                !toast ? showToast({
                    message: 'Toast',
                }) : closeToast()
            }}
            className={'p-5 bg-sand-1 rounded-t-3xl gap-5'}
            style={[{
                marginLeft: index === 0 ? NO_MOVIE_SIZE : 0,
                marginRight: index === moviesLengthMax ? NO_MOVIE_SIZE : 0,
                width: MOVIE_SIZE,
            }, animatedMoviePosition]}>
            <View
                className={`absolute size-12 ${backgroundPlacement[index] ?? 'bg-sand-1'} rounded-full justify-center items-center z-10`}
                style={StyleShadow['2']}>
                <Text className={'font-bold'}>{index + 1}</Text>
            </View>
            <FastImage
                style={[{
                    height: MOVIE_SIZE * 1.2,
                    borderRadius: 16
                }]}
                source={{
                    uri: getImagePath(movie.poster_path),
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Animated.View className={'items-center gap-3'} style={animatedMovieText}>
                <Text className={'text-center font-semibold text-2xl'}>{movie.title}</Text>
                <Rating rating={movie.vote_average} />
                {/*<Genres genres={item.genres} />*/}
                <Text numberOfLines={5}>{movie.overview}</Text>
            </Animated.View>
        </AnimatedPressable>
    )
}
